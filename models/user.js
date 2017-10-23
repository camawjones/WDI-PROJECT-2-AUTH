const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const commentSchema = new mongoose.Schema({
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
  firstName: { type: String, minlength: 2, required: true, trim: true},
  lastName: {type: String, minLength: 2, required: true, trim: true},
  email: { type: String, required: true, trim: true, unique: true },
  username: { type: String, required: true, trim: true, unique: true },
  // role: { type: String, enums: ['freelancer', 'client'], default: 'freelancer' },
  // password: { type: String, required: true },
  // skills: [{type: mongoose.Schema.ObjectId, ref: 'Skill' }],
  comments: [commentSchema]
});

userSchema.pre('save', function hashPassword(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPassword(next) {
  if(this.isModified('password') && this._passwordConfirmation!== this.password) this.invalidate('passwordConfirmation', 'Does not match');
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  console.log('&password£', password, this.password);
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
