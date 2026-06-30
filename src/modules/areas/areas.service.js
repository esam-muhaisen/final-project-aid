const areasRepository = require("./areas.repository");
const governoratesService = require("../governorates/governorates.service");

const create = async (data) => {
  // Validate that governorate exists
  await governoratesService.findById(data.governorate_id);
  return areasRepository.create(data);
};

const findAll = async () => {
  return areasRepository.findAll();
};

const findById = async (id) => {
  const area = await areasRepository.findById(id);
  if (!area) {
    const error = new Error("Area not found");
    error.status = 404;
    throw error;
  }
  return area;
};

const update = async (id, data) => {
  await findById(id);
  if (data.governorate_id) {
    await governoratesService.findById(data.governorate_id);
  }
  return areasRepository.update(id, data);
};

const deleteArea = async (id) => {
  await findById(id);
  return areasRepository.deleteArea(id);
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  deleteArea,
};
