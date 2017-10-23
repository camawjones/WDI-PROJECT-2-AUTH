const User = require('../models/user');

function authenticationsNew(req, res) {
  return res.render('registration/new');
}

function authenticationsCreate(req, res, next) {
  User
    .create(req.body)
    .then(() => res.redirect('/login'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest('/register', err.toString());
      next(err);
    });
}

module.exports = {
  new: authenticationsNew,
  create: authenticationsCreate
};
