const User = require('../models/user');

function sessionNew(req, res) {
  res.render('session/new');
}

function sessionCreate(req, res) {
  User
    .findOne({ email: req.body.email })
    .then((user) => {
      // console.log('*user', req.body.password);

      if(!user || !user.validatePassword(req.body.password)) {
        // console.log('*password', user.validatePassword(req.body.password));
        return res.status(401).render('session/new', { message: 'Unrecognised credentials' });
      }
      // console.log('heyyyyy');
      req.session.userId = user._id;

      return res.redirect('/');
    });
}

function sessionDelete(req, res) {
  return req.session.regenerate(() => res.redirect('/'));
}

module.exports = {
  new: sessionNew,
  create: sessionCreate,
  delete: sessionDelete
};
