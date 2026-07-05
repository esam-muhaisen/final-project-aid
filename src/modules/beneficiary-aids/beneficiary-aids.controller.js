const service = require("./beneficiary-aids.service");
const { formatBeneficiaryAidResponse, formatBeneficiaryAidListResponse } = require("./beneficiary-aids.dto");

const findAll = async (req, res, next) => {
  try {
    const list = await service.findAll(req.user, req.query);
    res.json(formatBeneficiaryAidListResponse(list));
  } catch (err) {
    next(err);
  }
};

const findById = async (req, res, next) => {
  try {
    const aid = await service.findById(req.params.id, req.user);
    res.json(formatBeneficiaryAidResponse(aid));
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const updated = await service.update(req.params.id, req.body, req.user);
    res.json(formatBeneficiaryAidResponse(updated));
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await service.remove(req.params.id, req.user);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const aid = await service.create(req.body, req.user);
    res.status(201).json(formatBeneficiaryAidResponse(aid));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
