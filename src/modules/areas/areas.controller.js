const areasService = require("./areas.service");
const { formatAreaResponse, formatAreaListResponse } = require("./areas.dto");

const create = async (req, res, next) => {
  try {
    const data = await areasService.create(req.body);
    res.status(201).json(formatAreaResponse(data));
  } catch (err) {
    next(err);
  }
};

const findAll = async (req, res, next) => {
  try {
    const list = await areasService.findAll();
    res.json(formatAreaListResponse(list));
  } catch (err) {
    next(err);
  }
};

const findById = async (req, res, next) => {
  try {
    const data = await areasService.findById(Number(req.params.id));
    res.json(formatAreaResponse(data));
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const data = await areasService.update(Number(req.params.id), req.body);
    res.json(formatAreaResponse(data));
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await areasService.deleteArea(Number(req.params.id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
};
