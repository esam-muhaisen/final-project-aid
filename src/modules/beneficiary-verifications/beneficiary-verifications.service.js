const verificationsRepository = require('./beneficiary-verifications.repository');
const beneficiariesRepository = require('../beneficiaries/beneficiaries.repository');
const audit = require('../../shared/audit');

const create = async (data, userId) => {
  const beneficiary = await beneficiariesRepository.findById(data.beneficiary_id);
  if (!beneficiary) {
    const err = new Error('Beneficiary not found');
    err.status = 404;
    throw err;
  }

  const payload = {
    beneficiary_id: data.beneficiary_id,
    org_id: data.org_id || null,
    verified_by: userId,
    result: data.result,
    notes: data.notes
  };

  const verification = await verificationsRepository.create(payload);

  // Update beneficiary status based on verification result
  const status = data.result === 'approved' ? 'eligible' : 'not_eligible';
  await beneficiariesRepository.update(data.beneficiary_id, {}, { status });

  await audit.logAuditAction(userId, 'verify_beneficiary', 'beneficiary_verifications', verification.id);
  return verification;
};

const findAll = async () => verificationsRepository.findAll();

const findById = async (id) => {
  const verification = await verificationsRepository.findById(id);
  if (!verification) {
    const err = new Error('Verification record not found');
    err.status = 404;
    throw err;
  }
  return verification;
};

const update = async (id, data) => {
  const existing = await findById(id);
  const updated = await verificationsRepository.update(id, data);

  if (data.result) {
    const status = data.result === 'approved' ? 'eligible' : 'not_eligible';
    await beneficiariesRepository.update(existing.beneficiary_id, {}, { status });
  }

  return updated;
};

const remove = async (id) => {
  await findById(id);
  return verificationsRepository.remove(id);
};

module.exports = { create, findAll, findById, update, remove };
