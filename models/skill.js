const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  image: { type: String, trim: true },
  icon: String
});

module.exports = mongoose.model('Skill', skillSchema);
