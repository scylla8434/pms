const express = require('express');
const router = express.Router();

// Example: Get all tasks
router.get('/', (req, res) => {
  res.json([{ id: 1, title: 'Sample Task', projectId: 1 }]);
});

module.exports = router; 