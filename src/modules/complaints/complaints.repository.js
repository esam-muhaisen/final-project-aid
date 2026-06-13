const prisma = require('../../config/db');

const create = async (data) => prisma.complaints.create({ data });

const findAll = async () => prisma.complaints.findMany({
  include: {
    beneficiaries: {
      include: {
        users: true
      }
    },
    users: true
  }
});

const findById = async (id) => prisma.complaints.findUnique({
  where: { id: Number(id) },
  include: {
    beneficiaries: {
      include: {
        users: true
      }
    },
    users: true
  }
});

const update = async (id, data) => prisma.complaints.update({
  where: { id: Number(id) },
  data
});

const remove = async (id) => prisma.complaints.delete({
  where: { id: Number(id) }
});

module.exports = { create, findAll, findById, update, remove };
