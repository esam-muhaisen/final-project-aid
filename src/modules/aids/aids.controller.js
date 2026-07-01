const aidsService = require('./aids.service');
const { formatAidResponse, formatAidListResponse } = require('./aids.dto');

const create = async (req, res, next) => {
  try {
    const aid = await aidsService.create(req.body);
    res.status(201).json(formatAidResponse(aid));
  } catch (err) {
    next(err);
  }
};

const findAll = async (req, res, next) => {
  try {
    const aids = await aidsService.findAll();
    res.json(formatAidListResponse(aids));
  } catch (err) {
    next(err);
  }
};

const findById = async (req, res, next) => {
  try {
    const aid = await aidsService.findById(req.params.id);
    res.json(formatAidResponse(aid));
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const updated = await aidsService.update(req.params.id, req.body);
    res.json(formatAidResponse(updated));
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await aidsService.deleteAid(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

const deduct = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const updated = await aidsService.deduct(req.params.id, quantity);
    res.json(formatAidResponse(updated));
  } catch (err) {
    next(err);
  }
};

module.exports = { create, findAll, findById, update, remove, deduct };
