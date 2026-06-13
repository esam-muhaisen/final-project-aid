const prisma = require('../../config/db');

const create = async (data) => prisma.notifications.create({ data });

const findAll = async () => prisma.notifications.findMany({
  orderBy: { created_at: 'desc' }
});

const findByUserId = async (userId) => prisma.notifications.findMany({
  where: { user_id: Number(userId) },
  orderBy: { created_at: 'desc' }
});

const findById = async (id) => prisma.notifications.findUnique({
  where: { id: Number(id) }
});

const update = async (id, data) => prisma.notifications.update({
  where: { id: Number(id) },
  data
});

const remove = async (id) => prisma.notifications.delete({
  where: { id: Number(id) }
});

module.exports = { create, findAll, findByUserId, findById, update, remove };
