const express = require('express');
const router = express.Router();

// Example: Get all projects
router.get('/', (req, res) => {
  res.json([{ id: 1, name: 'Sample Project' }]);
});

module.exports = router; 