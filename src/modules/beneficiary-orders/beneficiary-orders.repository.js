const prisma = require("../../config/db");

const create = async (data) => {
  return prisma.beneficiary_orders.create({
    data,
    include: {
      beneficiaries: { include: { users: true } },
      aid_types: true,
    },
  });
};

const findAll = async () => {
  return prisma.beneficiary_orders.findMany({
    include: {
      beneficiaries: { include: { users: true } },
      aid_types: true,
    },
    orderBy: { id: "asc" },
  });
};

const findByBeneficiary = async (beneficiary_id) => {
  return prisma.beneficiary_orders.findMany({
    where: { beneficiary_id: parseInt(beneficiary_id) },
    include: { aid_types: true },
    orderBy: { id: "asc" },
  });
};

const findById = async (id) => {
  return prisma.beneficiary_orders.findUnique({
    where: { id: parseInt(id) },
    include: {
      beneficiaries: { include: { users: true } },
      aid_types: true,
    },
  });
};

const update = async (id, data, orgId, pickupLocationId) => {
  const { id: _id, beneficiary_id, ...allowedData } = data;

  if (orgId && (allowedData.status === "approved" || allowedData.status === "rejected")) {
    return prisma.$transaction(async (tx) => {
      const updatedOrder = await tx.beneficiary_orders.update({
        where: { id: parseInt(id) },
        data: allowedData,
        include: {
          beneficiaries: { include: { users: true } },
          aid_types: true,
        },
      });

      await tx.beneficiary_aids.create({
        data: {
          beneficiary_id: updatedOrder.beneficiary_id,
          aid_type_id: updatedOrder.aid_type_id,
          pickup_location_id: pickupLocationId ? parseInt(pickupLocationId) : null,
          org_id: parseInt(orgId),
          order_id: updatedOrder.id,
          status: allowedData.status === "approved" ? "approved" : "rejected",
        },
      });

      return updatedOrder;
    });
  }

  return prisma.beneficiary_orders.update({
    where: { id: parseInt(id) },
    data: allowedData,
    include: {
      beneficiaries: { include: { users: true } },
      aid_types: true,
    },
  });
};

const remove = async (id) => {
  return prisma.beneficiary_orders.delete({
    where: { id: parseInt(id) },
  });
};

module.exports = { create, findAll, findByBeneficiary, findById, update, remove };
