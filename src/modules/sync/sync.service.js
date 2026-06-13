const syncRepository = require('./sync.repository');

const create = async (data, userId) => {
  const payload = {
    ...data,
    user_id: userId
  };
  return syncRepository.create(payload);
};

const findAll = async () => syncRepository.findAll();

const findById = async (id) => {
  const log = await syncRepository.findById(id);
  if (!log) {
    const err = new Error('Sync log not found');
    err.status = 404;
    throw err;
  }
  return log;
};

const updateStatus = async (id, status) => {
  await findById(id);
  const data = {
    sync_status: status,
    synced_at: status === 'synced' ? new Date() : null
  };
  return syncRepository.update(id, data);
};

const remove = async (id) => {
  await findById(id);
  return syncRepository.remove(id);
};

module.exports = { create, findAll, findById, updateStatus, remove };
