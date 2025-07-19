const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: String,
  members: [String],
});

module.exports = mongoose.model('Team', TeamSchema);
