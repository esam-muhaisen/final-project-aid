const prisma = require("../../config/db");

const create = async (userData, donorData) => {
  return prisma.$transaction(async (tx) => {
    const user = await tx.users.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
        role: "donor",
      },
    });

    return tx.donors.create({
      data: {
        ...donorData,
        user_id: user.id,
      },
      include: {
        users: true,
      },
    });
  });
};

const findAll = async () => {
  return prisma.donors.findMany({
    include: {
      users: true,
    },
    orderBy: { id: "desc" },
  });
};

const findById = async (id) => {
  return prisma.donors.findUnique({
    where: { id: parseInt(id) },
    include: {
      users: true,
    },
  });
};

const findByUserId = async (userId) => {
  return prisma.donors.findUnique({
    where: { user_id: parseInt(userId) },
    include: {
      users: true,
    },
  });
};

const update = async (id, userData, donorData) => {
  return prisma.$transaction(async (tx) => {
    const donor = await tx.donors.findUnique({
      where: { id: parseInt(id) },
    });

    if (Object.keys(userData).length > 0) {
      await tx.users.update({
        where: { id: donor.user_id },
        data: userData,
      });
    }

    return tx.donors.update({
      where: { id: parseInt(id) },
      data: donorData,
      include: {
        users: true,
      },
    });
  });
};

const deleteDonor = async (id) => {
  const donor = await prisma.donors.findUnique({
    where: { id: parseInt(id) },
  });
  if (donor) {
    await prisma.users.delete({
      where: { id: donor.user_id },
    });
  }
};

module.exports = {
  create,
  findAll,
  findById,
  findByUserId,
  update,
  deleteDonor,
};
