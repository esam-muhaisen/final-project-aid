const prisma = require("../../config/db");

const create = async (data) => {
  return prisma.pickup_locations.create({
    data,
    include: { areas: true },
  });
};

const findAll = async () => {
  return prisma.pickup_locations.findMany({
    include: { areas: true },
    orderBy: { id: "asc" },
  });
};

const findById = async (id) => {
  return prisma.pickup_locations.findUnique({
    where: { id: parseInt(id) },
    include: { areas: true },
  });
};

const update = async (id, data) => {
  return prisma.pickup_locations.update({
    where: { id: parseInt(id) },
    data,
    include: { areas: true },
  });
};

const remove = async (id) => {
  return prisma.pickup_locations.delete({
    where: { id: parseInt(id) },
  });
};

module.exports = { create, findAll, findById, update, remove };
