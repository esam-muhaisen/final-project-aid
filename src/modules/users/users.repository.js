const prisma = require("../../config/db");

const create = async (data) => {
  return prisma.users.create({
    data,
  });
};

const findAll = async () => {
  return prisma.users.findMany({
    orderBy: { created_at: "desc" },
  });
};

const findById = async (id) => {
  return prisma.users.findUnique({
    where: { id: parseInt(id) },
  });
};

const findByEmail = async (email) => {
  return prisma.users.findUnique({
    where: { email },
  });
};

const update = async (id, data) => {
  return prisma.users.update({
    where: { id: parseInt(id) },
    data,
  });
};

const deleteUser = async (id) => {
  return prisma.users.delete({
    where: { id: parseInt(id) },
  });
};

const updateStatus = async (id, isActive) => {
  return prisma.users.update({
    where: { id: parseInt(id) },
    data: { is_active: isActive },
  });
};

module.exports = {
  create,
  findAll,
  findById,
  findByEmail,
  update,
  deleteUser,
  updateStatus,
};
