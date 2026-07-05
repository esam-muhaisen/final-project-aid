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

const pickupLocationsService = require("../pickup-locations/pickup-locations.service");

const update = async (id, data) => {
  const order = await findById(id);
  if (data.aid_type_id) {
    await aidTypesService.findById(data.aid_type_id);
  }

  if (data.status !== undefined && data.status !== order.status) {
    if (order.status !== "pending") {
      const error = new Error("Order status cannot be changed once it is approved or rejected");
      error.status = 400;
      throw error;
    }

    // if (data.status === "approved" && !data.pickup_location_id) {
    //   const error = new Error("pickup_location_id is required when approving an order");
    //   error.status = 400;
    //   throw error;
    // }
  }

  if (data.pickup_location_id) {
    await pickupLocationsService.findById(data.pickup_location_id);
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
