const prisma = require('../../config/db');
const create = async (data) => prisma.donation_tracking.create({ data });
const findAll = async () => prisma.donation_tracking.findMany();
const findById = async (id) => prisma.donation_tracking.findUnique({ where: { id: Number(id) } });
const update = async (id, data) => prisma.donation_tracking.update({ where: { id: Number(id) }, data });
const remove = async (id) => prisma.donation_tracking.delete({ where: { id: Number(id) } });
module.exports = { create, findAll, findById, update, remove };
