const prisma = require("../../config/db");

const create = async (data) => {
  return prisma.aids.create({
    data,
  });
};

const findAll = async () => {
  return prisma.aids.findMany({
    include: {
      aid_types: {
        include: {
          aid_categories: true,
        },
      },
      donors: {
        include: {
          users: true,
        },
      },
    },
    orderBy: { created_at: "desc" },
  });
};

const findById = async (id) => {
  return prisma.aids.findUnique({
    where: { id: parseInt(id) },
    include: {
      aid_types: {
        include: {
          aid_categories: true,
        },
      },
      donors: {
        include: {
          users: true,
        },
      },
    },
  });
};

const findByBatchCode = async (batchCode) => {
  return prisma.aids.findUnique({
    where: { batch_code: batchCode },
  });
};

const update = async (id, data) => {
  return prisma.aids.update({
    where: { id: parseInt(id) },
    data,
  });
};

const deleteAid = async (id) => {
  return prisma.aids.delete({
    where: { id: parseInt(id) },
  });
};

module.exports = {
  create,
  findAll,
  findById,
  findByBatchCode,
  update,
  deleteAid,
};
