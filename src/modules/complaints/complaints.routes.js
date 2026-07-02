const express = require('express');
const complaintsController = require('./complaints.controller');
const authenticate = require('../../middleware/auth.middleware');
const authorize = require('../../middleware/role.middleware');
const validate = require('../../middleware/validation.middleware');
const { createComplaintSchema, resolveComplaintSchema } = require('./complaints.validation');

const router = express.Router();

router.post('/', authenticate, authorize(['beneficiary']), validate(createComplaintSchema), complaintsController.create);
router.get('/', authenticate, authorize(['admin', 'local_org']), complaintsController.findAll);
router.get('/:id', authenticate, authorize(['admin', 'beneficiary', 'local_org']), complaintsController.findById);
router.put('/:id', authenticate, authorize(['beneficiary']), validate(createComplaintSchema), complaintsController.update);
router.patch('/:id/resolve', authenticate, authorize(['admin', 'local_org']), validate(resolveComplaintSchema), complaintsController.resolveComplaint);
router.delete('/:id', authenticate, authorize(['admin']), complaintsController.remove);

module.exports = router;
