const bcrypt = require("bcryptjs");
const usersRepository = require("./users.repository");
const { logAuditAction } = require("../../shared/audit");

const create = async (data, actorId) => {
  if (data.email) {
    const existing = await usersRepository.findByEmail(data.email);
    if (existing) {
      const error = new Error("Email already in use");
      error.status = 400;
      throw error;
    }
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const created = await usersRepository.create({
    ...data,
    password: hashedPassword,
  });

  await logAuditAction(actorId, "User Creation", "users", created.id);
  return created;
};

const findAll = async () => {
  return usersRepository.findAll();
};

const findById = async (id) => {
  const user = await usersRepository.findById(id);
  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }
  return user;
};

const update = async (id, data, actorId) => {
  const user = await findById(id);

  if (data.email && data.email !== user.email) {
    const existing = await usersRepository.findByEmail(data.email);
    if (existing) {
      const error = new Error("Email already in use");
      error.status = 400;
      throw error;
    }
  }

  const updateData = { ...data };
  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 10);
  }

  const updated = await usersRepository.update(id, updateData);
  await logAuditAction(actorId, "User Update", "users", updated.id);
  return updated;
};

const deleteUser = async (id, actorId) => {
  await findById(id);
  await usersRepository.deleteUser(id);
  await logAuditAction(actorId, "User Deletion", "users", parseInt(id));
};

const updateStatus = async (id, isActive, actorId) => {
  await findById(id);
  const updated = await usersRepository.updateStatus(id, isActive);
  await logAuditAction(actorId, "User Status Update", "users", updated.id);
  return updated;
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  deleteUser,
  updateStatus,
};
