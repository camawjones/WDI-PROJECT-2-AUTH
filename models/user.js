const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const reviewsSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true }
});



const userSchema = new mongoose.Schema({
  firstName: { type: String, minlength: 2, required: true, trim: true},
  lastName: {type: String, minLength: 2, required: true, trim: true},
  email: { type: String, required: true, trim: true, unique: true },
  username: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, required: true, default: 0 },
  reviews: [reviewsSchema],
  skills: [{ type: mongoose.Schema.ObjectId, ref: 'Skill' }]
});

userSchema.pre('validate', function calculateRating(next) {
  if (!this.reviews.length) {
    this.rating = 0;
  } else {
    this.rating = (this.reviews.map(review => review.rating).reduce((total, next) => total + next) / this.reviews.length).toFixed();
  }

  return next();
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
