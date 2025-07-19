const express = require('express');
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all notifications
router.get('/', auth, async (req, res) => {
  const notifications = await Notification.find();
  res.json(notifications);
});

// Create notification
router.post('/', auth, async (req, res) => {
  const notification = new Notification(req.body);
  await notification.save();
  res.json(notification);
});

// Mark as read
router.put('/:id/read', auth, async (req, res) => {
  const notification = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
  res.json(notification);
});

// Delete notification
router.delete('/:id', auth, async (req, res) => {
  await Notification.findByIdAndDelete(req.params.id);
  res.json({ message: 'Notification deleted' });
});

module.exports = router;
