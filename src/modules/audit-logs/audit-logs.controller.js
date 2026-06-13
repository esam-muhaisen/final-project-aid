const auditLogsService = require('./audit-logs.service');
const { formatAuditLogResponse, formatAuditLogListResponse } = require('./audit-logs.dto');

const findAll = async (req, res, next) => {
  try {
    const list = await auditLogsService.findAll();
    res.json(formatAuditLogListResponse(list));
  } catch (err) {
    next(err);
  }
};

const findById = async (req, res, next) => {
  try {
    const log = await auditLogsService.findById(req.params.id);
    res.json(formatAuditLogResponse(log));
  } catch (err) {
    next(err);
  }
};

module.exports = { findAll, findById };
