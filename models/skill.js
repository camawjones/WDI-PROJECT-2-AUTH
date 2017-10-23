const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  image: { type: String, trim: true }
});

// skillSchema.methods.belongsTo = function skillBelongsTo(user) {
//   if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
//   return user.id === this.createdBy.toString();
// };


module.exports = mongoose.model('Skill', skillSchema);
