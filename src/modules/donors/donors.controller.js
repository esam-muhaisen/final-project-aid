const donorsService = require("./donors.service");
const { formatDonorResponse, formatDonorListResponse } = require("./donors.dto");

const create = async (req, res, next) => {
  try {
    const actorId = req.user ? req.user.id : null;
    const donor = await donorsService.create(req.body, actorId);
    res.status(201).json(formatDonorResponse(donor));
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    const donors = await donorsService.findAll();
    res.json(formatDonorListResponse(donors));
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const donor = await donorsService.findById(req.params.id);
    if (req.user.role === "donor" && req.user.id !== donor.user_id) {
      return res.status(403).json({ error: "Access denied" });
    }
    res.json(formatDonorResponse(donor));
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const donor = await donorsService.findById(req.params.id);
    if (req.user.role === "donor" && req.user.id !== donor.user_id) {
      return res.status(403).json({ error: "Access denied" });
    }
    const actorId = req.user ? req.user.id : null;
    const updated = await donorsService.update(req.params.id, req.body, actorId);
    res.json(formatDonorResponse(updated));
  } catch (error) {
    next(error);
  }
};

const deleteDonor = async (req, res, next) => {
  try {
    const actorId = req.user ? req.user.id : null;
    await donorsService.deleteDonor(req.params.id, actorId);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  deleteDonor,
};
