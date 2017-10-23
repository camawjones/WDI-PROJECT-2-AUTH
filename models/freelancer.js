const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true }
});

commentSchema.methods.belongsTo = function commentBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};

const freelancerSchema = new mongoose.Schema({
  name: String,
  skills: {
    skill1: String,
    skill2: String
  },
  image: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  comments: [commentSchema]
});

  // freelancerSchema.methods.belongsTo = function freelancerBelongsTo(user) {
  //   if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  //   return user.id === this.createdBy.toString();
  // };

module.exports = mongoose.model('freelancer', freelancerSchema);
