const express = require('express');
const verificationsController = require('./beneficiary-verifications.controller');
const authenticate = require('../../middleware/auth.middleware');
const authorize = require('../../middleware/role.middleware');
const validate = require('../../middleware/validation.middleware');
const { createSchema, updateSchema } = require('./beneficiary-verifications.validation');

const router = express.Router();

router.post('/', authenticate, authorize(['admin', 'local_org']), validate(createSchema), verificationsController.create);
router.get('/', authenticate, authorize(['admin', 'local_org']), verificationsController.findAll);
router.get('/:id', authenticate, authorize(['admin', 'local_org']), verificationsController.findById);
router.put('/:id', authenticate, authorize(['admin']), validate(updateSchema), verificationsController.update);
router.delete('/:id', authenticate, authorize(['admin']), verificationsController.remove);

module.exports = router;
