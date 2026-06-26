const express = require('express');
const aidsController = require('./aids.controller');
const authenticate = require('../../middleware/auth.middleware');
const authorize = require('../../middleware/role.middleware');
const validate = require('../../middleware/validation.middleware');
const { createAidSchema, updateAidSchema } = require('./aids.validation');

const router = express.Router();

router.post('/', authenticate, authorize(['admin', 'local_org']), validate(createAidSchema), aidsController.create);
router.get('/', authenticate, authorize(['admin', 'local_org']), aidsController.findAll);
router.get('/:id', authenticate, authorize(['admin', 'local_org']), aidsController.findById);
router.put('/:id', authenticate, authorize(['admin']), validate(updateAidSchema), aidsController.update);
router.delete('/:id', authenticate, authorize(['admin']), aidsController.remove);

module.exports = router;
