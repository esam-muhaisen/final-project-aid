const prisma = require("../../config/db");

const findAll = async (where = {}) => {
  return prisma.beneficiary_aids.findMany({
    where,
    include: {
      beneficiaries: { include: { users: true } },
      aid_types: true,
      pickup_locations: true,
      users: true,
      beneficiary_orders: true,
    },
    orderBy: { id: "asc" },
  });
};

const findById = async (id) => {
  return prisma.beneficiary_aids.findUnique({
    where: { id: parseInt(id) },
    include: {
      beneficiaries: { include: { users: true } },
      aid_types: true,
      pickup_locations: true,
      users: true,
      beneficiary_orders: true,
    },
  });
};

const update = async (id, data) => {
  return prisma.beneficiary_aids.update({
    where: { id: parseInt(id) },
    data,
    include: {
      beneficiaries: { include: { users: true } },
      aid_types: true,
      pickup_locations: true,
      users: true,
      beneficiary_orders: true,
    },
  });
};

const remove = async (id) => {
  return prisma.beneficiary_aids.delete({
    where: { id: parseInt(id) },
  });
};

const create = async (data) => {
  return prisma.beneficiary_aids.create({
    data,
    include: {
      beneficiaries: { include: { users: true } },
      aid_types: true,
      pickup_locations: true,
      users: true,
      beneficiary_orders: true,
    },
  });
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
