const complaintsRepository = require('./complaints.repository');
const beneficiariesRepository = require('../beneficiaries/beneficiaries.repository');
// const audit = require('../../shared/audit');

const create = async (data) => {
  const beneficiary = await beneficiariesRepository.findById(data.beneficiary_id);
  if (!beneficiary) {
    const err = new Error('Beneficiary not found');
    err.status = 404;
    throw err;
  }
  const complaint = await complaintsRepository.create(data);
  // await audit.log('create_complaint', 'complaints', complaint.id);
  return complaint;
};

const findAll = async () => complaintsRepository.findAll();

const findById = async (id) => {
  const complaint = await complaintsRepository.findById(id);
  if (!complaint) {
    const err = new Error('Complaint not found');
    err.status = 404;
    throw err;
  }
  return complaint;
};

const update = async (id, data) => {
  await findById(id);
  return complaintsRepository.update(id, data);
};

const resolveComplaint = async (id, data, adminUserId) => {
  await findById(id);
  const payload = {
    admin_response: data.admin_response,
    status: data.status || 'resolved',
    resolved_by: adminUserId
  };
  const complaint = await complaintsRepository.update(id, payload);
  // await audit.log('resolve_complaint', 'complaints', complaint.id);
  return complaint;
};

const remove = async (id) => {
  await findById(id);
  return complaintsRepository.remove(id);
};

module.exports = { create, findAll, findById, update, resolveComplaint, remove };
