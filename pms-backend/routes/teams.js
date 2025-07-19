const express = require('express');
const Team = require('../models/Team');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all teams
router.get('/', auth, async (req, res) => {
  const teams = await Team.find();
  res.json(teams);
});

// Create team
router.post('/', auth, async (req, res) => {
  const team = new Team(req.body);
  await team.save();
  res.json(team);
});

// Update team
router.put('/:id', auth, async (req, res) => {
  const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(team);
});

// Delete team
router.delete('/:id', auth, async (req, res) => {
  await Team.findByIdAndDelete(req.params.id);
  res.json({ message: 'Team deleted' });
});

module.exports = router;
