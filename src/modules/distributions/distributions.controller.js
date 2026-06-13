const distributionsService = require('./distributions.service');
const { formatDistributionResponse, formatDistributionListResponse } = require('./distributions.dto');

const create = async (req, res, next) => {
  try {
    const distribution = await distributionsService.create(req.body);
    res.status(201).json(formatDistributionResponse(distribution));
  } catch (err) {
    next(err);
  }
};

const findAll = async (req, res, next) => {
  try {
    const distributions = await distributionsService.findAll();
    res.json(formatDistributionListResponse(distributions));
  } catch (err) {
    next(err);
  }
};

const findById = async (req, res, next) => {
  try {
    const distribution = await distributionsService.findById(req.params.id);
    res.json(formatDistributionResponse(distribution));
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const updated = await distributionsService.update(req.params.id, req.body);
    res.json(formatDistributionResponse(updated));
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await distributionsService.delete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = { create, findAll, findById, update, remove };
