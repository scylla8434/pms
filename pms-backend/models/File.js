const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  name: String,
  path: String,
  uploadedBy: String,
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('File', FileSchema);
