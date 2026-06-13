const verificationsService = require('./beneficiary-verifications.service');
const { formatVerificationResponse, formatVerificationListResponse } = require('./beneficiary-verifications.dto');

const create = async (req, res, next) => {
  try {
    const verification = await verificationsService.create(req.body, req.user.id);
    res.status(201).json(formatVerificationResponse(verification));
  } catch (err) {
    next(err);
  }
};

const findAll = async (req, res, next) => {
  try {
    const list = await verificationsService.findAll();
    res.json(formatVerificationListResponse(list));
  } catch (err) {
    next(err);
  }
};

const findById = async (req, res, next) => {
  try {
    const verification = await verificationsService.findById(req.params.id);
    res.json(formatVerificationResponse(verification));
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const verification = await verificationsService.update(req.params.id, req.body);
    res.json(formatVerificationResponse(verification));
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await verificationsService.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = { create, findAll, findById, update, remove };
