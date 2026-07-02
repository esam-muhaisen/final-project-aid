const notificationsRepository = require('./notifications.repository');

const create = async (data) => notificationsRepository.create(data);

const findAll = async ({ page = 1, limit = 20, is_read, user_id, currentUserId, userRole }) => {
  const where = {};
  if (is_read !== undefined) where.is_read = is_read === 'true';
  if (userRole === 'admin' && user_id) where.user_id = Number(user_id);
  if (userRole !== 'admin') where.user_id = currentUserId;

  const skip = (page - 1) * limit;
  const [list, total] = await Promise.all([
    notificationsRepository.findAll({ where, orderBy: { created_at: 'desc' }, skip, take: limit }),
    notificationsRepository.count(where),
  ]);

  return { list, total, page, limit };
};

const findByUserId = async (userId) => notificationsRepository.findAll({
  where: { user_id: Number(userId) },
  orderBy: { created_at: 'desc' },
});

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
