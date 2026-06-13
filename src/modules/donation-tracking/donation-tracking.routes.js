const express = require('express');
const donationTrackingController = require('./donation-tracking.controller');
const authenticate = require('../../middleware/auth.middleware');
const authorize = require('../../middleware/role.middleware');
const validate = require('../../middleware/validation.middleware');
const { createTrackingSchema, updateTrackingSchema } = require('./donation-tracking.validation');

const router = express.Router();

router.post('/', authenticate, authorize(['admin', 'local_org']), validate(createTrackingSchema), donationTrackingController.create);
router.get('/', authenticate, donationTrackingController.findAll);
router.get('/:id', authenticate, donationTrackingController.findById);
router.put('/:id', authenticate, authorize(['admin', 'local_org']), validate(updateTrackingSchema), donationTrackingController.update);
router.delete('/:id', authenticate, authorize(['admin']), donationTrackingController.remove);

module.exports = router;
