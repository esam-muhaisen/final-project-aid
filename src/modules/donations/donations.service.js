const donationsRepository = require('./donations.repository');

const create = async (data) => {
  return donationsRepository.create(data);
};

const findAll = async () => donationsRepository.findAll();

const findById = async (id) => {
  const donation = await donationsRepository.findById(id);
  if (!donation) { const err = new Error('Donation not found'); err.status = 404; throw err; }
  return donation;
};

const update = async (id, data) => {
  await findById(id);
  return donationsRepository.update(id, data);
};

const remove = async (id) => {
  await findById(id);
  return donationsRepository.remove(id);
};

module.exports = { create, findAll, findById, update, remove };
