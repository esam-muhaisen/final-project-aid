const syncService = require('./sync.service');
const { formatSyncLogResponse, formatSyncLogListResponse } = require('./sync.dto');

const create = async (req, res, next) => {
  try {
    const log = await syncService.create(req.body, req.user ? req.user.id : null);
    res.status(201).json(formatSyncLogResponse(log));
  } catch (err) {
    next(err);
  }
};

const findAll = async (req, res, next) => {
  try {
    const list = await syncService.findAll();
    res.json(formatSyncLogListResponse(list));
  } catch (err) {
    next(err);
  }
};

const findById = async (req, res, next) => {
  try {
    const log = await syncService.findById(req.params.id);
    res.json(formatSyncLogResponse(log));
  } catch (err) {
    next(err);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const log = await syncService.updateStatus(req.params.id, req.body.sync_status);
    res.json(formatSyncLogResponse(log));
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await syncService.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = { create, findAll, findById, updateStatus, remove };
