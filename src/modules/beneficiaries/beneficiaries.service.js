const bcrypt = require("bcryptjs");
const beneficiariesRepository = require("./beneficiaries.repository");
const usersRepository = require("../users/users.repository");
const { logAuditAction } = require("../../shared/audit");

const calculatePriorityScore = (data) => {
  const familySize = data.family_size || 0;
  const disabledCount = data.disabled_count || 0;
  const patientsCount = data.patients_count || 0;
  const isDisplaced = data.is_displaced ? 15 : 0;
  const income = data.income || 0;

  const score = (familySize * 5) + (disabledCount * 10) + (patientsCount * 5) + isDisplaced - (income * 0.05);
  return Math.max(0, score);
};

const create = async (data, actorId) => {
  const existing = await beneficiariesRepository.findByNationalId(data.national_id);
  if (existing) {
    const error = new Error("National ID already registered");
    error.status = 400;
    throw error;
  }

  if (data.email) {
    const existingEmail = await usersRepository.findByEmail(data.email);
    if (existingEmail) {
      const error = new Error("Email already in use");
      error.status = 400;
      throw error;
    }
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const score = calculatePriorityScore(data);

  const userData = {
    name: data.name,
    email: data.email,
    password: hashedPassword,
    phone: data.phone,
  };

  const beneficiaryData = {
    national_id: data.national_id,
    area_id: data.area_id,
    family_size: data.family_size,
    income: data.income,
    patients_count: data.patients_count,
    disabled_count: data.disabled_count,
    is_displaced: data.is_displaced,
    release_date: new Date(data.release_date),
    priority_score: score,
    status: "pending",
  };

  const created = await beneficiariesRepository.create(userData, beneficiaryData);
  await logAuditAction(actorId || created.users.id, "Beneficiary Creation", "beneficiaries", created.id);
  return created;
};

const findAll = async () => {
  return beneficiariesRepository.findAll();
};

const findById = async (id) => {
  const beneficiary = await beneficiariesRepository.findById(id);
  if (!beneficiary) {
    const error = new Error("Beneficiary not found");
    error.status = 404;
    throw error;
  }
  return beneficiary;
};

const update = async (id, data, actorId) => {
  const beneficiary = await findById(id);

  if (data.national_id && data.national_id !== beneficiary.national_id) {
    const existing = await beneficiariesRepository.findByNationalId(data.national_id);
    if (existing) {
      const error = new Error("National ID already registered");
      error.status = 400;
      throw error;
    }
  }

  if (data.email && data.email !== beneficiary.users.email) {
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

  const beneficiaryFields = ["national_id", "area_id", "family_size", "income", "patients_count", "disabled_count", "is_displaced", "status", "release_date"];
  const beneficiaryData = {};
  let recalculateScore = false;

  for (const field of beneficiaryFields) {
    if (data[field] !== undefined) {
      if (field === "release_date") {
        beneficiaryData[field] = new Date(data[field]);
      } else {
        beneficiaryData[field] = data[field];
      }
      if (["family_size", "income", "patients_count", "disabled_count", "is_displaced"].includes(field)) {
        recalculateScore = true;
      }
    }
  }

  if (recalculateScore) {
    const merged = {
      family_size: data.family_size !== undefined ? data.family_size : beneficiary.family_size,
      income: data.income !== undefined ? data.income : beneficiary.income.toNumber ? beneficiary.income.toNumber() : beneficiary.income,
      patients_count: data.patients_count !== undefined ? data.patients_count : beneficiary.patients_count,
      disabled_count: data.disabled_count !== undefined ? data.disabled_count : beneficiary.disabled_count,
      is_displaced: data.is_displaced !== undefined ? data.is_displaced : beneficiary.is_displaced,
    };
    beneficiaryData.priority_score = calculatePriorityScore(merged);
  }

  const updated = await beneficiariesRepository.update(id, userData, beneficiaryData);
  await logAuditAction(actorId, "Beneficiary Update", "beneficiaries", updated.id);
  return updated;
};

const deleteBeneficiary = async (id, actorId) => {
  await findById(id);
  await beneficiariesRepository.deleteBeneficiary(id);
  await logAuditAction(actorId, "Beneficiary Deletion", "beneficiaries", parseInt(id));
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  deleteBeneficiary,
};
