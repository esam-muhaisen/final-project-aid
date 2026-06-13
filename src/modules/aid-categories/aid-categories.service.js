const categoriesRepository = require("./aid-categories.repository");

const create = async (data) => {
  return categoriesRepository.create(data);
};

const findAll = async () => {
  return categoriesRepository.findAll();
};

const findById = async (id) => {
  const category = await categoriesRepository.findById(id);
  if (!category) {
    const error = new Error("Aid category not found");
    error.status = 404;
    throw error;
  }
  return category;
};

const update = async (id, data) => {
  await findById(id);
  return categoriesRepository.update(id, data);
};

const deleteCategory = async (id) => {
  await findById(id);
  return categoriesRepository.deleteCategory(id);
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  deleteCategory,
};
