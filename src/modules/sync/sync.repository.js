const prisma = require('../../config/db');

const create = async (data) => prisma.sync_logs.create({ data });

const findAll = async () => prisma.sync_logs.findMany({
  orderBy: { created_at: 'desc' }
});

const findById = async (id) => prisma.sync_logs.findUnique({
  where: { id: Number(id) }
});

const update = async (id, data) => prisma.sync_logs.update({
  where: { id: Number(id) },
  data
});

const remove = async (id) => prisma.sync_logs.delete({
  where: { id: Number(id) }
});

module.exports = { create, findAll, findById, update, remove };
