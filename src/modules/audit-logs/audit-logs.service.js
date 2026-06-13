const auditLogsRepository = require('./audit-logs.repository');

const findAll = async () => auditLogsRepository.findAll();

const findById = async (id) => {
  const log = await auditLogsRepository.findById(id);
  if (!log) {
    const err = new Error('Audit log not found');
    err.status = 404;
    throw err;
  }
  return log;
};

module.exports = { findAll, findById };
