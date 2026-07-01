const prisma = require("../../config/db");

const create = async (data) => {
  return prisma.aids.create({
    data,
  });
};

const findAll = async () => {
  return prisma.aids.findMany({
    include: {
      aid_types: {
        include: {
          aid_categories: true,
        },
      },
      local_organizations: {
        include: {
          users: true,
        },
      },
    },
    orderBy: { created_at: "desc" },
  });
};

const findById = async (id) => {
  return prisma.aids.findUnique({
    where: { id: parseInt(id) },
    include: {
      aid_types: {
        include: {
          aid_categories: true,
        },
      },
      local_organizations: {
        include: {
          users: true,
        },
      },
    },
  });
};

const findByBatchCode = async (batchCode) => {
  return prisma.aids.findUnique({
    where: { batch_code: batchCode },
  });
};

const update = async (id, data) => {
  return prisma.aids.update({
    where: { id: parseInt(id) },
    data,
  });
};

const deleteAid = async (id) => {
  return prisma.aids.delete({
    where: { id: parseInt(id) },
  });
};

const findByTypeAndOrg = async (aid_type_id, org_id) => {
  // If org_id is null/undefined, we might just query where it's null, or we can handle it specifically.
  // The Prisma 'where' object for nulls should use `org_id: org_id || null`.
  return prisma.aids.findFirst({
    where: {
      aid_type_id: parseInt(aid_type_id),
      org_id: org_id ? parseInt(org_id) : null,
      status: "active",
    },
  });
};

const incrementQuantity = async (id, amount) => {
  return prisma.aids.update({
    where: { id: parseInt(id) },
    data: {
      quantity: { increment: amount },
      remaining_quantity: { increment: amount },
    },
  });
};

const deductQuantity = async (id, amount) => {
  const aid = await prisma.aids.findUnique({ where: { id: parseInt(id) } });
  const newRemaining = aid.remaining_quantity - amount;
  return prisma.aids.update({
    where: { id: parseInt(id) },
    data: {
      remaining_quantity: newRemaining,
      status: newRemaining === 0 ? 'exhausted' : aid.status,
    },
  });
};

module.exports = {
  create,
  findAll,
  findById,
  findByBatchCode,
  update,
  deleteAid,
  findByTypeAndOrg,
  incrementQuantity,
  deductQuantity,
};
