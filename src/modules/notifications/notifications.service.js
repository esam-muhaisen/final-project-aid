const notificationsRepository = require('./notifications.repository');

const create = async (data) => {
  return notificationsRepository.create(data);
};

const findAll = async () => notificationsRepository.findAll();

const findByUserId = async (userId) => notificationsRepository.findByUserId(userId);

const findById = async (id) => {
  const notification = await notificationsRepository.findById(id);
  if (!notification) {
    const err = new Error('Notification not found');
    err.status = 404;
    throw err;
  }
  return notification;
};

const update = async (id, data) => {
  await findById(id);
  return notificationsRepository.update(id, data);
};

const markAsRead = async (id) => {
  await findById(id);
  return notificationsRepository.update(id, { is_read: true });
};

const remove = async (id) => {
  await findById(id);
  return notificationsRepository.remove(id);
};

module.exports = { create, findAll, findByUserId, findById, update, markAsRead, remove };
