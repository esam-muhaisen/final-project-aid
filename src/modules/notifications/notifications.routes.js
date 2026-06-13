const express = require('express');
const notificationsController = require('./notifications.controller');
const authenticate = require('../../middleware/auth.middleware');
const authorize = require('../../middleware/role.middleware');
const validate = require('../../middleware/validation.middleware');
const { createNotificationSchema, updateNotificationSchema } = require('./notifications.validation');

const router = express.Router();

router.post('/', authenticate, authorize(['admin']), validate(createNotificationSchema), notificationsController.create);
router.get('/', authenticate, authorize(['admin']), notificationsController.findAll);
router.get('/my', authenticate, notificationsController.findMyNotifications);
router.get('/:id', authenticate, notificationsController.findById);
router.put('/:id', authenticate, authorize(['admin']), validate(updateNotificationSchema), notificationsController.update);
router.patch('/:id/read', authenticate, notificationsController.markAsRead);
router.delete('/:id', authenticate, authorize(['admin']), notificationsController.remove);

module.exports = router;
