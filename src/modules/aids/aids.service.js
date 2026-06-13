const aidsRepository = require("./aids.repository");
const aidTypesService = require("../aid-types/aid-types.service");
const donorsRepository = require("../donors/donors.repository");

const create = async (data) => {
  await aidTypesService.findById(data.aid_type_id);

  if (data.donor_id) {
    const donor = await donorsRepository.findById(data.donor_id);
    if (!donor) {
      const error = new Error("Donor not found");
      error.status = 400;
      throw error;
    }
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

  if (data.expiry_date) {
    aidData.expiry_date = new Date(data.expiry_date);
  }

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

  if (data.donor_id) {
    const donor = await donorsRepository.findById(data.donor_id);
    if (!donor) {
      const error = new Error("Donor not found");
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
  if (data.expiry_date) {
    updateData.expiry_date = new Date(data.expiry_date);
  }

  return aidsRepository.update(id, updateData);
};

const deleteAid = async (id) => {
  await findById(id);
  return aidsRepository.deleteAid(id);
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  deleteAid,
};
