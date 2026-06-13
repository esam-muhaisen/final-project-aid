const prisma = require("../../config/db");

const create = async (data) => {
  return prisma.distribution_cycles.create({
    data,
  });
};

const findAll = async () => {
  return prisma.distribution_cycles.findMany({
    orderBy: { created_at: "desc" },
  });
};

const findById = async (id) => {
  return prisma.distribution_cycles.findUnique({
    where: { id: parseInt(id) },
  });
};

const update = async (id, data) => {
  return prisma.distribution_cycles.update({
    where: { id: parseInt(id) },
    data,
  });
};

const deleteCycle = async (id) => {
  return prisma.distribution_cycles.delete({
    where: { id: parseInt(id) },
  });
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  deleteCycle,
};
