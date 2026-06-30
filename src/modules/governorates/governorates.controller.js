const governoratesService = require("./governorates.service");
const { formatGovernorateResponse, formatGovernorateListResponse } = require("./governorates.dto");

const create = async (req, res, next) => {
  try {
    const data = await governoratesService.create(req.body);
    res.status(201).json(formatGovernorateResponse(data));
  } catch (err) {
    next(err);
  }
};

const findAll = async (req, res, next) => {
  try {
    const list = await governoratesService.findAll();
    res.json(formatGovernorateListResponse(list));
  } catch (err) {
    next(err);
  }
};

const findById = async (req, res, next) => {
  try {
    const data = await governoratesService.findById(Number(req.params.id));
    res.json(formatGovernorateResponse(data));
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const data = await governoratesService.update(Number(req.params.id), req.body);
    res.json(formatGovernorateResponse(data));
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await governoratesService.deleteGovernorate(Number(req.params.id));
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
