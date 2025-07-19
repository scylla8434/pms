const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  assignee: String,
  dueDate: String,
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
});

module.exports = mongoose.model('Task', TaskSchema);
