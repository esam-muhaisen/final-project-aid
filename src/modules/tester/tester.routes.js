const express = require('express');
const path = require('path');
const listEndpoints = require('express-list-endpoints');
const router = express.Router();

router.get('/routes', (req, res) => {
  try {
    const endpoints = listEndpoints(req.app);
    res.json({ success: true, endpoints });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'tester.html'));
});

module.exports = router;
