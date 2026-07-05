const prisma = require("../../config/db");
const repository = require("./beneficiary-aids.repository");
const organizationsRepository = require("../organizations/organizations.repository");
const beneficiariesRepository = require("../beneficiaries/beneficiaries.repository");
const pickupLocationsService = require("../pickup-locations/pickup-locations.service");

const findAll = async (user, queryFilters = {}) => {
  const where = {};

  if (user.role === "beneficiary") {
    const beneficiary = await beneficiariesRepository.findByUserId(user.id);
    if (!beneficiary) {
      const error = new Error("Beneficiary record not found");
      error.status = 404;
      throw error;
    }
    where.beneficiary_id = beneficiary.id;
  } else if (user.role === "local_org") {
    const org = await organizationsRepository.findByUserId(user.id);
    if (!org) {
      const error = new Error("Local organization record not found");
      error.status = 404;
      throw error;
    }
    where.org_id = org.id;
  } else if (user.role === "admin") {
    if (queryFilters.beneficiary_id) {
      where.beneficiary_id = parseInt(queryFilters.beneficiary_id);
    }
    if (queryFilters.org_id) {
      where.org_id = parseInt(queryFilters.org_id);
    }
  } else {
    const error = new Error("Access denied");
    error.status = 403;
    throw error;
  }

  if (queryFilters.status) {
    where.status = queryFilters.status;
  }

  return repository.findAll(where);
};

const findById = async (id, user) => {
  const aid = await repository.findById(id);
  if (!aid) {
    const error = new Error("Beneficiary aid record not found");
    error.status = 404;
    throw error;
  }

  // Ownership validation
  if (user.role === "beneficiary") {
    const beneficiary = await beneficiariesRepository.findByUserId(user.id);
    if (!beneficiary || aid.beneficiary_id !== beneficiary.id) {
      const error = new Error("Access denied 1");
      error.status = 403;
      throw error;
    }
  } 

  return aid;
};

const update = async (id, data, user) => {

  const aid = await findById(id, user);

  // Once rejected, status cannot be changed
  if (aid.status === "rejected") {
    const error = new Error("Cannot update a rejected beneficiary aid");
    error.status = 400;
    throw error;
  }

  if (data.pickup_location_id) {
    await pickupLocationsService.findById(data.pickup_location_id);
  }

  return repository.update(id, data);
};

const remove = async (id, user) => {
  if (user.role !== "admin") {
    const error = new Error("Access denied: Only admins can delete beneficiary aids");
    error.status = 403;
    throw error;
  }
  
  // Verify it exists
  await findById(id, user);
  return repository.remove(id);
};

const create = async (data, user) => {
  if (user.role === "local_org") {
    const org = await organizationsRepository.findByUserId(user.id);
    if (!org) {
      const error = new Error("Local organization record not found");
      error.status = 404;
      throw error;
    }
  }

  const beneficiary = await beneficiariesRepository.findById(data.beneficiary_id);
  if (!beneficiary) {
    const error = new Error("Beneficiary not found");
    error.status = 404;
    throw error;
  }

  const aidType = await prisma.aid_types.findUnique({
    where: { id: data.aid_type_id },
  });
  if (!aidType) {
    const error = new Error("Aid type not found");
    error.status = 404;
    throw error;
  }

  if (data.pickup_location_id) {
    await pickupLocationsService.findById(data.pickup_location_id);
  }

  const createData = {
    beneficiary_id: data.beneficiary_id,
    aid_type_id: data.aid_type_id,
    pickup_location_id: data.pickup_location_id ?? null,
    verify_by_user_id: user.id,
    status: data.status,
    order_id: data.order_id ?? null
  };

  return repository.create(createData);
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
