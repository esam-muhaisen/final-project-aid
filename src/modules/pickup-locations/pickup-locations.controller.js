const pickupLocationsService = require("./pickup-locations.service");
const { formatPickupLocationResponse, formatPickupLocationListResponse } = require("./pickup-locations.dto");

const create = async (req, res, next) => {
  try {
    const data = await pickupLocationsService.create(req.body);
    res.status(201).json(formatPickupLocationResponse(data));
  } catch (err) {
    next(err);
  }
};

const findAll = async (req, res, next) => {
  try {
    const list = await pickupLocationsService.findAll();
    res.json(formatPickupLocationListResponse(list));
  } catch (err) {
    next(err);
  }
};

const findById = async (req, res, next) => {
  try {
    const data = await pickupLocationsService.findById(Number(req.params.id));
    res.json(formatPickupLocationResponse(data));
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const data = await pickupLocationsService.update(Number(req.params.id), req.body);
    res.json(formatPickupLocationResponse(data));
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await pickupLocationsService.remove(Number(req.params.id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = { create, findAll, findById, update, remove };
