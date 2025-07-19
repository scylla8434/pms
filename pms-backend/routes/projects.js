const express = require('express');
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all projects
router.get('/', auth, async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

// Create project
router.post('/', auth, async (req, res) => {
  const project = new Project({ ...req.body, createdBy: req.user.id });
  await project.save();
  res.json(project);
});

// Update project
router.put('/:id', auth, async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(project);
});

// Delete project
router.delete('/:id', auth, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Project deleted' });
});

module.exports = router;
