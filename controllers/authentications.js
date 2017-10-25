const User = require('../models/user');
const Skill = require('../models/skill');

function authenticationsNew(req, res) {
  Skill
    .find()
    .exec()
    .then(skills => {
      return res.render('registration/new', { skills });
    });
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
