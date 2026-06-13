const prisma = require('../../config/db');

const findAll = async () => prisma.audit_logs.findMany({
  include: { users: true },
  orderBy: { created_at: 'desc' }
});

const findById = async (id) => prisma.audit_logs.findUnique({
  where: { id: Number(id) },
  include: { users: true }
});

module.exports = { findAll, findById };
