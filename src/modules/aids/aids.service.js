const aidsRepository = require("./aids.repository");
const aidTypesService = require("../aid-types/aid-types.service");
const organizationsRepository = require("../organizations/organizations.repository");

const create = async (data) => {
  await aidTypesService.findById(data.aid_type_id);

  if (data.org_id) {
    const org = await organizationsRepository.findById(data.org_id);
    if (!org) {
      const error = new Error("Organization not found");
      error.status = 400;
      throw error;
    }
  }

  // Check if an active aid of this type and org already exists
  const existingAid = await aidsRepository.findByTypeAndOrg(data.aid_type_id, data.org_id);
  
  if (existingAid) {
    // Upsert: increment quantity instead of creating a new row
    return aidsRepository.incrementQuantity(existingAid.id, data.quantity);
  }

  let batchCode = data.batch_code;
  if (!batchCode) {
    batchCode = `BATCH-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
  } else {
    const existing = await aidsRepository.findByBatchCode(batchCode);
    if (existing) {
      const error = new Error("Batch code already exists");
      error.status = 400;
      throw error;
    }
  }

  const aidData = {
    ...data,
    batch_code: batchCode,
    remaining_quantity: data.quantity,
    status: "active",
  };


  return aidsRepository.create(aidData);
};

const findAll = async () => {
  return aidsRepository.findAll();
};

const findById = async (id) => {
  const aid = await aidsRepository.findById(id);
  if (!aid) {
    const error = new Error("Aid batch not found");
    error.status = 404;
    throw error;
  }
  return aid;
};

const update = async (id, data) => {
  const aid = await findById(id);

  if (data.aid_type_id) {
    await aidTypesService.findById(data.aid_type_id);
  }

  if (data.org_id) {
    const org = await organizationsRepository.findById(data.org_id);
    if (!org) {
      const error = new Error("Organization not found");
      error.status = 400;
      throw error;
    }
  }

  if (data.batch_code && data.batch_code !== aid.batch_code) {
    const existing = await aidsRepository.findByBatchCode(data.batch_code);
    if (existing) {
      const error = new Error("Batch code already exists");
      error.status = 400;
      throw error;
    }
  }

  const updateData = { ...data };

  return aidsRepository.update(id, updateData);
};

const deleteAid = async (id) => {
  await findById(id);
  return aidsRepository.deleteAid(id);
};

const deduct = async (id, quantity) => {
  const aid = await findById(id);
  if (aid.remaining_quantity < quantity) {
    const error = new Error("Insufficient remaining quantity");
    error.status = 400;
    throw error;
  }
  return aidsRepository.deductQuantity(id, quantity);
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  deleteAid,
  deduct,
};
