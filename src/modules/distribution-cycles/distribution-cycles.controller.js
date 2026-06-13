const cyclesService = require('./distribution-cycles.service');
const { formatCycleResponse, formatCycleListResponse } = require('./distribution-cycles.dto');

const create = async (req, res, next) => {
  try {
    const cycle = await cyclesService.create(req.body);
    res.status(201).json(formatCycleResponse(cycle));
  } catch (err) {
    next(err);
  }
};

const findAll = async (req, res, next) => {
  try {
    const list = await cyclesService.findAll();
    res.json(formatCycleListResponse(list));
  } catch (err) {
    next(err);
  }
};

const findById = async (req, res, next) => {
  try {
    const cycle = await cyclesService.findById(req.params.id);
    res.json(formatCycleResponse(cycle));
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const cycle = await cyclesService.update(req.params.id, req.body);
    res.json(formatCycleResponse(cycle));
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await cyclesService.deleteCycle(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = { create, findAll, findById, update, remove };
