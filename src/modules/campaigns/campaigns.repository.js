const prisma = require("../../config/db");

const create = async (data) => {
  return prisma.campaigns.create({
    data,
  });
};

const findAll = async () => {
  return prisma.campaigns.findMany({
    orderBy: { created_at: "desc" },
  });
};

const findById = async (id) => {
  return prisma.campaigns.findUnique({
    where: { id: parseInt(id) },
  });
};

const update = async (id, data) => {
  return prisma.campaigns.update({
    where: { id: parseInt(id) },
    data,
  });
};

const deleteCampaign = async (id) => {
  return prisma.campaigns.delete({
    where: { id: parseInt(id) },
  });
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  deleteCampaign,
};
