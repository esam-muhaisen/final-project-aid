const prisma = require("../../config/db");

const create = async (userData, orgData) => {
  return prisma.$transaction(async (tx) => {
    const user = await tx.users.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
        role: "local_org",
      },
    });

    return tx.local_organizations.create({
      data: {
        ...orgData,
        user_id: user.id,
      },
      include: {
        users: true,
      },
    });
  });
};

const findAll = async () => {
  return prisma.local_organizations.findMany({
    include: {
      users: true,
      areas: {
        include: {
          governorates: true,
        },
      },
    },
    orderBy: { id: "desc" },
  });
};

const findById = async (id) => {
  return prisma.local_organizations.findUnique({
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
  return prisma.local_organizations.findUnique({
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

const update = async (id, userData, orgData) => {
  return prisma.$transaction(async (tx) => {
    const org = await tx.local_organizations.findUnique({
      where: { id: parseInt(id) },
    });

    if (Object.keys(userData).length > 0) {
      await tx.users.update({
        where: { id: org.user_id },
        data: userData,
      });
    }

    return tx.local_organizations.update({
      where: { id: parseInt(id) },
      data: orgData,
      include: {
        users: true,
      },
    });
  });
};

const deleteOrg = async (id) => {
  const org = await prisma.local_organizations.findUnique({
    where: { id: parseInt(id) },
  });
  if (org) {
    await prisma.users.delete({
      where: { id: org.user_id },
    });
  }
};

const verify = async (id, isVerified) => {
  return prisma.local_organizations.update({
    where: { id: parseInt(id) },
    data: { is_verified: isVerified },
    include: {
      users: true,
    },
  });
};

module.exports = {
  create,
  findAll,
  findById,
  findByUserId,
  update,
  deleteOrg,
  verify,
};
