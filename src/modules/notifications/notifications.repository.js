const prisma = require('../../config/db');

const create = async (data) => prisma.notifications.create({ data });

const findAll = async ({ where, orderBy, skip, take }) =>
  prisma.notifications.findMany({ where, orderBy, skip, take });

const count = async (where) => prisma.notifications.count({ where });

const findById = async (id) =>
  prisma.notifications.findUnique({ where: { id: Number(id) } });

const update = async (id, data) =>
  prisma.notifications.update({ where: { id: Number(id) }, data });

const remove = async (id) =>
  prisma.notifications.delete({ where: { id: Number(id) } });

module.exports = { create, findAll, count, findById, update, remove };
