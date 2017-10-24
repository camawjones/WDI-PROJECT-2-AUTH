const User = require('../models/user');
const Skill = require('../models/skill');

function indexRoute(req, res, next) {
  const query = {};
  if (req.query) {
    query.skills = req.query.skills;
  }

  User
    .find()
    .exec()
    .then(users => {
      console.log(users);
      res.render('users/index', { users });
    })
    .catch(next);
}

function profileRoute(req, res) {
  User
    .findById(req.currentUser)
    .populate('skills')
    .exec()
    .then(user => {
      res.render('users/profile', { user });
    });
}

function showRoute(req, res, next) {
  User
    .findById(req.params.id)
    .populate('reviews.createdBy skills')
    .exec()
    .then(user => {
      return res.render('users/show', { user });
    })
    .catch(next);
}

function editRoute(req, res) {
  Skill
    .find()
    .exec()
    .then(skills => {
      res.render('registration/edit', { skills });
    });
}

// function skillsUpdate(req, res, next) {
//   User
//     .findById(req.params.id)
//     .exec()
//     .then(user => {
//       if (!user) return res.notFound();
//
//       req.body.createdBy = req.user;
//       if(user.skill.checked){
//         user.skills.push();
//       }
//     })
//     .then(() => res.redirect(`/users/${req.params.id}`))
//     .catch((err) => {
//       if (err.name === 'ValidationError')   res.badRequest(`/users/${req.params.id}`, err.toString());
//       next(err);
//     });
// }


// req.body.skills = [id, id2, id3]
// Find all the skills
// res.render('users/skills/new', { skills })

function updateRoute(req, res, next) {
  console.log(req.body);
  for(const field in req.body) {
    req.currentUser[field] = req.body[field];
  }

  req.currentUser.save()
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

      req.body.createdBy = req.currentUser;
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
  // skills: skillsUpdate
};
