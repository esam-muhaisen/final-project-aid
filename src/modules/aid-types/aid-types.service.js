const aidTypesRepository = require("./aid-types.repository");
const categoriesService = require("../aid-categories/aid-categories.service");

const create = async (data) => {
  await categoriesService.findById(data.category_id);
  return aidTypesRepository.create(data);
};

const findAll = async () => {
  return aidTypesRepository.findAll();
};

const findById = async (id) => {
  const aidType = await aidTypesRepository.findById(id);
  if (!aidType) {
    const error = new Error("Aid type not found");
    error.status = 404;
    throw error;
  }
  return aidType;
};

const update = async (id, data) => {
  await findById(id);
  if (data.category_id) {
    await categoriesService.findById(data.category_id);
  }
  return aidTypesRepository.update(id, data);
};

const deleteAidType = async (id) => {
  await findById(id);
  return aidTypesRepository.deleteAidType(id);
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  deleteAidType,
};
