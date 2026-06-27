const pickupLocationsRepository = require("./pickup-locations.repository");

const create = async (data) => {
  return pickupLocationsRepository.create(data);
};

const findAll = async () => {
  return pickupLocationsRepository.findAll();
};

const findById = async (id) => {
  const location = await pickupLocationsRepository.findById(id);
  if (!location) {
    const error = new Error("Pickup location not found");
    error.status = 404;
    throw error;
  }
  return location;
};

const update = async (id, data) => {
  await findById(id);
  return pickupLocationsRepository.update(id, data);
};

const remove = async (id) => {
  await findById(id);
  return pickupLocationsRepository.remove(id);
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
};
