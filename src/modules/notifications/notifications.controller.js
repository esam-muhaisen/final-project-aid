const notificationsService = require('./notifications.service');
const { formatNotificationResponse, formatNotificationListResponse } = require('./notifications.dto');

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
    const list = await notificationsService.findAll();
    res.json(formatNotificationListResponse(list));
  } catch (err) {
    next(err);
  }
};

const findMyNotifications = async (req, res, next) => {
  try {
    const list = await notificationsService.findByUserId(req.user.id);
    res.json(formatNotificationListResponse(list));
  } catch (err) {
    next(err);
  }
};

const findById = async (req, res, next) => {
  try {
    const notification = await notificationsService.findById(req.params.id);
    // Secure it so user can only see their own notifications unless admin
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

module.exports = { create, findAll, findMyNotifications, findById, update, markAsRead, remove };
