const donationsService = require('./donations.service');
const { formatDonationResponse, formatDonationListResponse } = require('./donations.dto');

const create = async (req, res, next) => {
  try {
    const donation = await donationsService.create(req.body);
    res.status(201).json(formatDonationResponse(donation));
  } catch (err) {
    next(err);
  }
};

const findAll = async (req, res, next) => {
  try {
    const list = await donationsService.findAll();
    res.json(formatDonationListResponse(list));
  } catch (err) {
    next(err);
  }
};

const findById = async (req, res, next) => {
  try {
    const donation = await donationsService.findById(req.params.id);
    res.json(formatDonationResponse(donation));
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const updated = await donationsService.update(req.params.id, req.body);
    res.json(formatDonationResponse(updated));
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await donationsService.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = { create, findAll, findById, update, remove };
