const express = require('express');
const cyclesController = require('./distribution-cycles.controller');
const authenticate = require('../../middleware/auth.middleware');
const authorize = require('../../middleware/role.middleware');
const validate = require('../../middleware/validation.middleware');
const { createCycleSchema, updateCycleSchema } = require('./distribution-cycles.validation');

const router = express.Router();

router.post('/', authenticate, authorize(['admin']), validate(createCycleSchema), cyclesController.create);
router.get('/', authenticate, authorize(['admin', 'local_org']), cyclesController.findAll);
router.get('/:id', authenticate, authorize(['admin', 'local_org']), cyclesController.findById);
router.put('/:id', authenticate, authorize(['admin']), validate(updateCycleSchema), cyclesController.update);
router.delete('/:id', authenticate, authorize(['admin']), cyclesController.remove);

module.exports = router;
