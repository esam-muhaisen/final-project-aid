const bcrypt = require("bcryptjs");
const donorsRepository = require("./donors.repository");
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

  const donorData = {
    org_name: data.org_name,
    country: data.country,
  };

  const created = await donorsRepository.create(userData, donorData);
  await logAuditAction(actorId || created.users.id, "Donor Creation", "donors", created.id);
  return created;
};

const findAll = async () => {
  return donorsRepository.findAll();
};

const findById = async (id) => {
  const donor = await donorsRepository.findById(id);
  if (!donor) {
    const error = new Error("Donor not found");
    error.status = 404;
    throw error;
  }
  return donor;
};

const update = async (id, data, actorId) => {
  const donor = await findById(id);

  if (data.email && data.email !== donor.users.email) {
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

  const donorData = {};
  if (data.org_name !== undefined) donorData.org_name = data.org_name;
  if (data.country !== undefined) donorData.country = data.country;

  const updated = await donorsRepository.update(id, userData, donorData);
  await logAuditAction(actorId, "Donor Update", "donors", updated.id);
  return updated;
};

const deleteDonor = async (id, actorId) => {
  await findById(id);
  await donorsRepository.deleteDonor(id);
  await logAuditAction(actorId, "Donor Deletion", "donors", parseInt(id));
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  deleteDonor,
};
