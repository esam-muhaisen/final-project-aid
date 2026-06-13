const prisma = require('../../config/db');

const create = async (data) => prisma.distributions.create({ data });

const findAll = async () => prisma.distributions.findMany();

const findById = async (id) => prisma.distributions.findUnique({ where: { id: Number(id) } });

const update = async (id, data) => prisma.distributions.update({ where: { id: Number(id) }, data });

const remove = async (id) => prisma.distributions.delete({ where: { id: Number(id) } });

module.exports = { create, findAll, findById, update, remove };
