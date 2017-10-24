const User = require('../models/user');

function authenticationsNew(req, res) {
  return res.render('registration/new');
}

function authenticationsCreate(req, res, next) {
  User
    .create(req.body)
    .then((user) => {
      req.session.userId = user.id;
      req.currentUser = user;
      res.locals.currentUser = user;
      res.locals.isAuthenticated = true;

      res.redirect('/profile');
    })
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest('/register', err.toString());
      next(err);
    });
}

module.exports = {
  new: authenticationsNew,
  create: authenticationsCreate
};
