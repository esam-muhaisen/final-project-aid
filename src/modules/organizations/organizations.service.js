const bcrypt = require("bcryptjs");
const orgsRepository = require("./organizations.repository");
const usersRepository = require("../users/users.repository");
const { logAuditAction } = require("../../shared/audit");

const create = async (data, actorId) => {
  if (data.email) {
    const existingEmail = await usersRepository.findByEmail(data.email);
    if (existingEmail) {
      const error = new Error("Email already in use");
      error.status = 400;
      throw error;
    }
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const userData = {
    name: data.name,
    email: data.email,
    password: hashedPassword,
    phone: data.phone,
  };

  const orgData = {
    org_name: data.org_name,
    area_id: data.area_id,
    is_verified: false,
  };

  const created = await orgsRepository.create(userData, orgData);
  await logAuditAction(actorId || created.users.id, "Organization Creation", "local_organizations", created.id);
  return created;
};

const findAll = async () => {
  return orgsRepository.findAll();
};

const findById = async (id) => {
  const org = await orgsRepository.findById(id);
  if (!org) {
    const error = new Error("Organization not found");
    error.status = 404;
    throw error;
  }
  return org;
};

const update = async (id, data, actorId) => {
  const org = await findById(id);

  if (data.email && data.email !== org.users.email) {
    const existingEmail = await usersRepository.findByEmail(data.email);
    if (existingEmail) {
      const error = new Error("Email already in use");
      error.status = 400;
      throw error;
    }
  }

  const userData = {};
  if (data.name) userData.name = data.name;
  if (data.email) userData.email = data.email;
  if (data.phone) userData.phone = data.phone;
  if (data.password) {
    userData.password = await bcrypt.hash(data.password, 10);
  }

  const orgData = {};
  if (data.org_name !== undefined) orgData.org_name = data.org_name;
  if (data.area_id !== undefined) orgData.area_id = data.area_id;

  const updated = await orgsRepository.update(id, userData, orgData);
  await logAuditAction(actorId, "Organization Update", "local_organizations", updated.id);
  return updated;
};

const deleteOrg = async (id, actorId) => {
  await findById(id);
  await orgsRepository.deleteOrg(id);
  await logAuditAction(actorId, "Organization Deletion", "local_organizations", parseInt(id));
};

const verify = async (id, isVerified, actorId) => {
  await findById(id);
  const updated = await orgsRepository.verify(id, isVerified);
  await logAuditAction(actorId, "Organization Verification Update", "local_organizations", updated.id);
  return updated;
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  deleteOrg,
  verify,
};
