const express = require('express');
const campaignsController = require('./campaigns.controller');
const authenticate = require('../../middleware/auth.middleware');
const authorize = require('../../middleware/role.middleware');
const validate = require('../../middleware/validation.middleware');
const { createCampaignSchema, updateCampaignSchema } = require('./campaigns.validation');

const router = express.Router();

router.post('/', authenticate, authorize(['admin', 'local_org']), validate(createCampaignSchema), campaignsController.create);
router.get('/', campaignsController.findAll);
router.get('/:id', campaignsController.findById);
router.put('/:id', validate(updateCampaignSchema), campaignsController.update);
router.delete('/:id', authenticate, authorize(['admin', 'local_org']), campaignsController.remove);

module.exports = router;
