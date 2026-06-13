const complaintsService = require('./complaints.service');
const { formatComplaintResponse, formatComplaintListResponse } = require('./complaints.dto');

const create = async (req, res, next) => {
  try {
    const complaint = await complaintsService.create(req.body);
    res.status(201).json(formatComplaintResponse(complaint));
  } catch (err) {
    next(err);
  }
};

const findAll = async (req, res, next) => {
  try {
    const list = await complaintsService.findAll();
    res.json(formatComplaintListResponse(list));
  } catch (err) {
    next(err);
  }
};

const findById = async (req, res, next) => {
  try {
    const complaint = await complaintsService.findById(req.params.id);
    res.json(formatComplaintResponse(complaint));
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const complaint = await complaintsService.update(req.params.id, req.body);
    res.json(formatComplaintResponse(complaint));
  } catch (err) {
    next(err);
  }
};

const resolveComplaint = async (req, res, next) => {
  try {
    const complaint = await complaintsService.resolveComplaint(req.params.id, req.body, req.user.id);
    res.json(formatComplaintResponse(complaint));
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await complaintsService.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = { create, findAll, findById, update, resolveComplaint, remove };
