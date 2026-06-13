const prisma = require('../../config/db');

const create = async (data) => prisma.beneficiary_verifications.create({ data });

const findAll = async () => prisma.beneficiary_verifications.findMany({
  include: {
    beneficiaries: true,
    local_organizations: true,
    users: true
  }
});

const findById = async (id) => prisma.beneficiary_verifications.findUnique({
  where: { id: Number(id) },
  include: {
    beneficiaries: true,
    local_organizations: true,
    users: true
  }
});

const update = async (id, data) => prisma.beneficiary_verifications.update({
  where: { id: Number(id) },
  data
});

const remove = async (id) => prisma.beneficiary_verifications.delete({
  where: { id: Number(id) }
});

module.exports = { create, findAll, findById, update, remove };
