const beneficiariesService = require("./beneficiaries.service");
const { formatBeneficiaryResponse, formatBeneficiaryListResponse } = require("./beneficiaries.dto");

const create = async (req, res, next) => {
  try {
    const actorId = req.user ? req.user.id : null;
    const beneficiary = await beneficiariesService.create(req.body, actorId);
    res.status(201).json(formatBeneficiaryResponse(beneficiary));
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    const beneficiaries = await beneficiariesService.findAll();
    res.json(formatBeneficiaryListResponse(beneficiaries));
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const beneficiary = await beneficiariesService.findById(req.params.id);
    if (req.user.role === "beneficiary" && req.user.id !== beneficiary.user_id) {
      return res.status(403).json({ error: "Access denied" });
    }
    res.json(formatBeneficiaryResponse(beneficiary));
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const beneficiary = await beneficiariesService.findById(req.params.id);
    if (req.user.role === "beneficiary" && req.user.id !== beneficiary.user_id) {
      return res.status(403).json({ error: "Access denied" });
    }
    const actorId = req.user ? req.user.id : null;
    const updated = await beneficiariesService.update(req.params.id, req.body, actorId);
    res.json(formatBeneficiaryResponse(updated));
  } catch (error) {
    next(error);
  }
};

const deleteBeneficiary = async (req, res, next) => {
  try {
    const actorId = req.user ? req.user.id : null;
    await beneficiariesService.deleteBeneficiary(req.params.id, actorId);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const findHistory = async (req, res, next) => {
  try {
    const beneficiary = await beneficiariesService.findById(req.params.id);
    if (req.user.role === "beneficiary" && req.user.id !== beneficiary.user_id) {
      return res.status(403).json({ error: "Access denied" });
    }
    const history = await beneficiariesService.findHistory(req.params.id);
    res.json(history);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  deleteBeneficiary,
  findHistory,
};
