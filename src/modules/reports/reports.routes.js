const express = require('express');
const reportsController = require('./reports.controller');
const authenticate = require('../../middleware/auth.middleware');
const authorize = require('../../middleware/role.middleware');

const router = express.Router();

router.get('/dashboard', authenticate, authorize(['admin']), reportsController.getDashboardStats);

module.exports = router;
