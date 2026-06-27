const beneficiaryOrdersRepository = require("./beneficiary-orders.repository");
const beneficiariesService = require("../beneficiaries/beneficiaries.service");
const aidTypesService = require("../aid-types/aid-types.service");

const create = async (data) => {
  await beneficiariesService.findById(data.beneficiary_id);
  await aidTypesService.findById(data.aid_type_id);
  return beneficiaryOrdersRepository.create(data);
};

const findAll = async () => {
  return beneficiaryOrdersRepository.findAll();
};

const findByBeneficiary = async (beneficiary_id) => {
  await beneficiariesService.findById(beneficiary_id);
  return beneficiaryOrdersRepository.findByBeneficiary(beneficiary_id);
};

const  findById = async (id) => {
  const order = await beneficiaryOrdersRepository.findById(id);
  if (!order) {
    const error = new Error("Beneficiary order not found");
    error.status = 404;
    throw error;
  }
  return order;
};

const update = async (id, data) => {
  await findById(id);
  if (data.aid_type_id) {
    await aidTypesService.findById(data.aid_type_id);
  }
  return beneficiaryOrdersRepository.update(id, data);
};

const deleteOrder = async (id) => {
  await findById(id);
  return beneficiaryOrdersRepository.remove(id);
};

module.exports = {
  create,
  findAll,
  findByBeneficiary,
  findById,
  update,
  deleteOrder,
};
