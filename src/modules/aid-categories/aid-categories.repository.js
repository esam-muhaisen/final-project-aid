const prisma = require("../../config/db");

const create = async (data) => {
  return prisma.aid_categories.create({
    data,
  });
};

const findAll = async () => {
  return prisma.aid_categories.findMany({
    orderBy: { id: "asc" },
  });
};

const findById = async (id) => {
  return prisma.aid_categories.findUnique({
    where: { id: parseInt(id) },
  });
};

const update = async (id, data) => {
  return prisma.aid_categories.update({
    where: { id: parseInt(id) },
    data,
  });
};

const deleteCategory = async (id) => {
  return prisma.aid_categories.delete({
    where: { id: parseInt(id) },
  });
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  deleteCategory,
};
