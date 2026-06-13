const prisma = require("../../config/db");

const create = async (data) => {
  return prisma.aid_types.create({
    data,
  });
};

const findAll = async () => {
  return prisma.aid_types.findMany({
    include: {
      aid_categories: true,
    },
    orderBy: { id: "asc" },
  });
};

const findById = async (id) => {
  return prisma.aid_types.findUnique({
    where: { id: parseInt(id) },
    include: {
      aid_categories: true,
    },
  });
};

const update = async (id, data) => {
  return prisma.aid_types.update({
    where: { id: parseInt(id) },
    data,
  });
};

const deleteAidType = async (id) => {
  return prisma.aid_types.delete({
    where: { id: parseInt(id) },
  });
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  deleteAidType,
};
