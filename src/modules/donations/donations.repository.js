const prisma = require('../../config/db');
const create = async (data) => prisma.donations.create({ data });
const findAll = async () => prisma.donations.findMany();
const findById = async (id) => prisma.donations.findUnique({ where: { id: Number(id) } });
const update = async (id, data) => prisma.donations.update({ where: { id: Number(id) }, data });
const remove = async (id) => prisma.donations.delete({ where: { id: Number(id) } });

const findByDonorId = async (donorId) => {
  return prisma.donations.findFirst({
    where: { donor_id: Number(donorId) },
  });
};

const incrementAmount = async (id, amount) => {
  return prisma.donations.update({
    where: { id: Number(id) },
    data: { amount: { increment: amount } },
  });
};

module.exports = { create, findAll, findById, update, remove, findByDonorId, incrementAmount };
