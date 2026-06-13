const express = require('express');
const complaintsController = require('./complaints.controller');
const authenticate = require('../../middleware/auth.middleware');
const authorize = require('../../middleware/role.middleware');
const validate = require('../../middleware/validation.middleware');
const { createComplaintSchema, resolveComplaintSchema } = require('./complaints.validation');

const router = express.Router();

router.post('/', authenticate, authorize(['beneficiary']), validate(createComplaintSchema), complaintsController.create);
router.get('/', authenticate, authorize(['admin']), complaintsController.findAll);
router.get('/:id', authenticate, authorize(['admin', 'beneficiary']), complaintsController.findById);
router.put('/:id', authenticate, authorize(['beneficiary']), validate(createComplaintSchema), complaintsController.update);
router.patch('/:id/resolve', authenticate, authorize(['admin']), validate(resolveComplaintSchema), complaintsController.resolveComplaint);
router.delete('/:id', authenticate, authorize(['admin']), complaintsController.remove);

module.exports = router;
