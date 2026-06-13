const prisma = require("../../config/db");

const create = async (userData, beneficiaryData) => {
  return prisma.$transaction(async (tx) => {
    const user = await tx.users.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
        role: "beneficiary",
      },
    });

    return tx.beneficiaries.create({
      data: {
        ...beneficiaryData,
        user_id: user.id,
      },
      include: {
        users: true,
      },
    });
  });
};

const findAll = async () => {
  return prisma.beneficiaries.findMany({
    include: {
      users: true,
      areas: {
        include: {
          governorates: true,
        },
      },
    },
    orderBy: { created_at: "desc" },
  });
};

const findById = async (id) => {
  return prisma.beneficiaries.findUnique({
    where: { id: parseInt(id) },
    include: {
      users: true,
      areas: {
        include: {
          governorates: true,
        },
      },
    },
  });
};

const findByUserId = async (userId) => {
  return prisma.beneficiaries.findUnique({
    where: { user_id: parseInt(userId) },
    include: {
      users: true,
      areas: {
        include: {
          governorates: true,
        },
      },
    },
  });
};

const findByNationalId = async (nationalId) => {
  return prisma.beneficiaries.findUnique({
    where: { national_id: nationalId },
    include: {
      users: true,
    },
  });
};

const update = async (id, userData, beneficiaryData) => {
  return prisma.$transaction(async (tx) => {
    const beneficiary = await tx.beneficiaries.findUnique({
      where: { id: parseInt(id) },
    });

    if (Object.keys(userData).length > 0) {
      await tx.users.update({
        where: { id: beneficiary.user_id },
        data: userData,
      });
    }

    return tx.beneficiaries.update({
      where: { id: parseInt(id) },
      data: beneficiaryData,
      include: {
        users: true,
      },
    });
  });
};

const deleteBeneficiary = async (id) => {
  const beneficiary = await prisma.beneficiaries.findUnique({
    where: { id: parseInt(id) },
  });
  if (beneficiary) {
    await prisma.users.delete({
      where: { id: beneficiary.user_id },
    });
  }
};

const findHistory = async (id) => {
  return prisma.distributions.findMany({
    where: { beneficiary_id: parseInt(id) },
    include: {
      aids: {
        include: {
          aid_types: true,
        },
      },
      local_organizations: true,
      distribution_cycles: true,
    },
    orderBy: { created_at: "desc" },
  });
};

module.exports = {
  create,
  findAll,
  findById,
  findByUserId,
  findByNationalId,
  update,
  deleteBeneficiary,
  findHistory,
};
