const express = require('express');
const router = express.Router();

// Example: Get all teams
router.get('/', (req, res) => {
  res.json([{ id: 1, name: 'Sample Team' }]);
});

module.exports = router; 