const express = require('express');
const donationsController = require('./donations.controller');
const authenticate = require('../../middleware/auth.middleware');
const authorize = require('../../middleware/role.middleware');
const validate = require('../../middleware/validation.middleware');
const { createDonationSchema } = require('./donations.validation');

const router = express.Router();

router.post('/', validate(createDonationSchema), donationsController.create);
router.get('/', authenticate, authorize(['admin']), donationsController.findAll);
router.get('/:id', authenticate, donationsController.findById);
router.put('/:id', authenticate, authorize(['admin']), donationsController.update);
router.delete('/:id', authenticate, authorize(['admin']), donationsController.remove);

module.exports = router;
