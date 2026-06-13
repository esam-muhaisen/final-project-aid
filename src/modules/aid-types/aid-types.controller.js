const aidTypesService = require('./aid-types.service');
const { formatAidTypeResponse, formatAidTypeListResponse } = require('./aid-types.dto');

const create = async (req, res, next) => {
  try {
    const aidType = await aidTypesService.create(req.body);
    res.status(201).json(formatAidTypeResponse(aidType));
  } catch (err) {
    next(err);
  }
};

const findAll = async (req, res, next) => {
  try {
    const aidTypes = await aidTypesService.findAll();
    res.json(formatAidTypeListResponse(aidTypes));
  } catch (err) {
    next(err);
  }
};

const findById = async (req, res, next) => {
  try {
    const aidType = await aidTypesService.findById(req.params.id);
    res.json(formatAidTypeResponse(aidType));
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const updated = await aidTypesService.update(req.params.id, req.body);
    res.json(formatAidTypeResponse(updated));
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await aidTypesService.deleteAidType(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = { create, findAll, findById, update, remove };
