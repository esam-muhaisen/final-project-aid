const prisma = require("../../config/db");

const create = async (data) => {
  return prisma.governorates.create({
    data,
  });
};

const findAll = async () => {
  return prisma.governorates.findMany({
    orderBy: { id: "asc" },
  });
};

const findById = async (id) => {
  return prisma.governorates.findUnique({
    where: { id: parseInt(id) },
  });
};

const update = async (id, data) => {
  return prisma.governorates.update({
    where: { id: parseInt(id) },
    data,
  });
};

const deleteGovernorate = async (id) => {
  return prisma.governorates.delete({
    where: { id: parseInt(id) },
  });
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  deleteGovernorate,
};
