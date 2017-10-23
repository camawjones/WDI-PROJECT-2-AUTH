const User = require('../models/user');

function indexRoute(req, res, next) {
  User
    .find()
    .exec()
    .then(users => {
      res.render('users/index', { users });
    })
    .catch(next);
}

function profileRoute(req, res) {
  return res.render('users/profile');
}

function showRoute(req, res, next) {
  User
    .findById(req.params.id)
    .populate('reviews.createdBy')
    .exec()
    .then(user => {
      return res.render('users/show', { user });
    })
    .catch(next);
}

function editRoute(req, res) {
  return res.render('registration/edit');
}

function updateRoute(req, res, next) {
  for(const field in req.body) {
    req.user[field] = req.body[field];
  }

  req.user.save()
    .then(() => res.redirect('/profile'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest('/profile/edit', err.toString());
      next(err);
    });
}

function createReviewRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      if (!user) return res.notFound();

      req.body.createdBy = req.user;
      user.reviews.push(req.body);

      return user.save();
    })
    .then(() => res.redirect(`/users/${req.params.id}`))
    .catch((err) => {
      if (err.name === 'ValidationError') res.badRequest(`/users/${req.params.id}`, err.toString());
      next(err);
    });
}

//DELETECOMMENT
function deleteReviewRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      if (!user) return res.notFound();
      if (!user.belongsTo(req.user)) return res.unauthorized('You do not have permission to delete that resource');
      user.reviews.id(req.params.reviewId).remove();

      return user.save();
    })
    .then(user => res.redirect(`/users/${user.id}`))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  profile: profileRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  createReview: createReviewRoute,
  deleteReview: deleteReviewRoute
};
