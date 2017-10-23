const User = require('../models/user');

function showRoute(req, res) {
  return res.render('registration/show');
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

function createCommentRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      if (!user) return res.notFound();

      req.body.createdBy = req.user;
      user.comments.push(req.body);

      return user.save();
    })
    .then(() => res.redirect(`/users/${req.params.id}`))
    .catch((err) => {
      if (err.name === 'ValidationError') res.badRequest(`/users/${req.params.id}`, err.toString());
      next(err);
    });
}

//DELETECOMMENT
function deleteCommentRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      if (!user) return res.notFound();
      if (!user.belongsTo(req.user)) return res.unauthorized('You do not have permission to delete that resource');
      user.comments.id(req.params.commentId).remove();

      return user.save();
    })
    .then(user => res.redirect(`/users/${user.id}`))
    .catch(next);
}

module.exports = {
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute
};
