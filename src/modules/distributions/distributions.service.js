const distributionsRepository = require('./distributions.repository');
const aidsRepository = require('../aids/aids.repository');
const beneficiariesRepository = require('../beneficiaries/beneficiaries.repository');
const audit = require('../../shared/audit');

const create = async (data) => {
  const aid = await aidsRepository.findById(data.aid_id);
  if (!aid) { const err = new Error('Aid not found'); err.status = 404; throw err; }
  if (aid.remaining_quantity < data.quantity_given) { const err = new Error('Insufficient aid quantity'); err.status = 400; throw err; }
  const beneficiary = await beneficiariesRepository.findById(data.beneficiary_id);
  if (!beneficiary) { const err = new Error('Beneficiary not found'); err.status = 404; throw err; }
  const distribution = await distributionsRepository.create(data);
  await aidsRepository.update(data.aid_id, { remaining_quantity: aid.remaining_quantity - data.quantity_given });
  await audit.log('create_distribution', 'distributions', distribution.id);
  return distribution;
};

const findAll = async () => distributionsRepository.findAll();

const findById = async (id) => {
  const distribution = await distributionsRepository.findById(id);
  if (!distribution) { const err = new Error('Distribution not found'); err.status = 404; throw err; }
  return distribution;
};

const update = async (id, data) => {
  await findById(id);
  return distributionsRepository.update(id, data);
};

const remove = async (id) => {
  await findById(id);
  return distributionsRepository.deleteDistribution(id);
};

module.exports = { create, findAll, findById, update, remove };
