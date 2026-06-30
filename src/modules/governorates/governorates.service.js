const governoratesRepository = require("./governorates.repository");

const create = async (data) => {
  return governoratesRepository.create(data);
};

const findAll = async () => {
  return governoratesRepository.findAll();
};

const findById = async (id) => {
  const governorate = await governoratesRepository.findById(id);
  if (!governorate) {
    const error = new Error("Governorate not found");
    error.status = 404;
    throw error;
  }
  return governorate;
};

const update = async (id, data) => {
  await findById(id);
  return governoratesRepository.update(id, data);
};

const deleteGovernorate = async (id) => {
  await findById(id);
  return governoratesRepository.deleteGovernorate(id);
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  deleteGovernorate,
};
