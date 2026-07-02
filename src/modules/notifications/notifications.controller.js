const notificationsService = require('./notifications.service');
const { formatNotificationResponse, formatPaginatedResponse } = require('./notifications.dto');

const create = async (req, res, next) => {
  try {
    const notification = await notificationsService.create(req.body);
    res.status(201).json(formatNotificationResponse(notification));
  } catch (err) {
    next(err);
  }
};

const findAll = async (req, res, next) => {
  try {
    const { page, limit, is_read, user_id } = req.query;
    const result = await notificationsService.findAll({
      page: Number(page),
      limit: Number(limit),
      is_read,
      user_id,
      currentUserId: req.user.id,
      userRole: req.user.role,
    });
    res.json(formatPaginatedResponse(result.list, result.total, result.page, result.limit));
  } catch (err) {
    next(err);
  }
};

const findById = async (req, res, next) => {
  try {
    const notification = await notificationsService.findById(req.params.id);
    if (req.user.role !== 'admin' && notification.user_id !== req.user.id) {
      const err = new Error('Access denied');
      err.status = 403;
      throw err;
    }
    res.json(formatNotificationResponse(notification));
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const notification = await notificationsService.update(req.params.id, req.body);
    res.json(formatNotificationResponse(notification));
  } catch (err) {
    next(err);
  }
};

const markAsRead = async (req, res, next) => {
  try {
    const notification = await notificationsService.markAsRead(req.params.id);
    res.json(formatNotificationResponse(notification));
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await notificationsService.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = { create, findAll, findById, update, markAsRead, remove };
