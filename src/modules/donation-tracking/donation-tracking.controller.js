const donationTrackingService = require('./donation-tracking.service');
const { formatTrackingResponse, formatTrackingListResponse } = require('./donation-tracking.dto');

const create = async (req, res, next) => {
  try {
    const tracking = await donationTrackingService.create(req.body);
    res.status(201).json(formatTrackingResponse(tracking));
  } catch (err) {
    next(err);
  }
};

const findAll = async (req, res, next) => {
  try {
    const list = await donationTrackingService.findAll();
    res.json(formatTrackingListResponse(list));
  } catch (err) {
    next(err);
  }
};

const findById = async (req, res, next) => {
  try {
    const tracking = await donationTrackingService.findById(req.params.id);
    res.json(formatTrackingResponse(tracking));
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const tracking = await donationTrackingService.update(req.params.id, req.body);
    res.json(formatTrackingResponse(tracking));
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await donationTrackingService.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = { create, findAll, findById, update, remove };
