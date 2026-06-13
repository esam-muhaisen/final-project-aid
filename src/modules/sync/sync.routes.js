const express = require('express');
const syncController = require('./sync.controller');
const authenticate = require('../../middleware/auth.middleware');
const authorize = require('../../middleware/role.middleware');
const validate = require('../../middleware/validation.middleware');
const { createSyncLogSchema, updateSyncLogSchema } = require('./sync.validation');

const router = express.Router();

router.post('/', authenticate, authorize(['admin', 'local_org']), validate(createSyncLogSchema), syncController.create);
router.get('/', authenticate, authorize(['admin']), syncController.findAll);
router.get('/:id', authenticate, authorize(['admin', 'local_org']), syncController.findById);
router.patch('/:id/status', authenticate, authorize(['admin']), validate(updateSyncLogSchema), syncController.updateStatus);
router.delete('/:id', authenticate, authorize(['admin']), syncController.remove);

module.exports = router;
