const prisma = require("../../config/db");

const create = async (data) => {
  return prisma.areas.create({
    data,
    include: { governorates: true },
  });
};

const findAll = async () => {
  return prisma.areas.findMany({
    include: { governorates: true },
    orderBy: { id: "asc" },
  });
};

const findById = async (id) => {
  return prisma.areas.findUnique({
    where: { id: parseInt(id) },
    include: { governorates: true },
  });
};

const update = async (id, data) => {
  return prisma.areas.update({
    where: { id: parseInt(id) },
    data,
    include: { governorates: true },
  });
};

const deleteArea = async (id) => {
  return prisma.areas.delete({
    where: { id: parseInt(id) },
  });
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  deleteArea,
};
