const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, trim: true }
});

module.exports = mongoose.model('Skill', skillSchema);
