const express = require('express');
const notificationsController = require('./notifications.controller');
const authenticate = require('../../middleware/auth.middleware');
const authorize = require('../../middleware/role.middleware');
const validate = require('../../middleware/validation.middleware');
const { createNotificationSchema, updateNotificationSchema, notificationQuerySchema } = require('./notifications.validation');

const router = express.Router();

router.post('/', authenticate, validate(createNotificationSchema), notificationsController.create);
router.get('/', authenticate, validate(notificationQuerySchema), notificationsController.findAll);
router.get('/:id', authenticate, notificationsController.findById);
router.put('/:id', authenticate, authorize(['admin']), validate(updateNotificationSchema), notificationsController.update);
router.patch('/:id/read', authenticate, notificationsController.markAsRead);
router.delete('/:id', authenticate, authorize(['admin']), notificationsController.remove);

module.exports = router;
