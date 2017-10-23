const Freelancer = require('../models/freelancer');
const skill = [
  'Graphic Design',
  'Web Developer',
  'Animator',
  'PR/Marketing',
  'App developer',
  'UX Designer'
];
//INDEX
function freelancersIndex(req, res, next) {
  Freelancer
    .find()
    .then((freelancers) => res.render('freelancers/index', { freelancers }))
    .catch(next);
}
//NEW

function freelancersNew(req, res) {
  res.render('freelancers/new', { skill });
}

//CREATE
function freelancersCreate(req, res, next) {
  Freelancer
    .create(req.body)
    .then(() => res.redirect('/freelancers'))
    .catch(next);
}

//show
function showRoute(req, res, next) {
  Freelancer
    .findById(req.params.id)
    .populate('createdBy comments.createdBy')
    .exec()
    .then(freelancer => {
      if(!freelancer) return res.notFound();
      return res.render('freelancers/show', { freelancer });
    })
    .catch(next);
}
//edit

function editRoute(req, res, next) {
  Freelancer
    .findById(req.params.id)
    .exec()
    .then(freelancer => {
      if(!freelancer) return res.redirect();
      if(!freelancer.belongsTo(req.user)) return res.unauthorized('You do not have permission to edit that resource');
      return res.render('freelancers/edit', { freelancer });
    })
    .catch(next);
}
//update

function updateRoute(req, res, next) {
  Freelancer
    .findById(req.params.id)
    .exec()
    .then(freelancer => {
      if(!freelancer) return res.notFound();
      if(!freelancer.belongsTo(req.user)) return res.unauthorized('You do not have permission to edit that resource');

      for(const field in req.body) {
        freelancer[field] = req.body[field];
      }

      return freelancer.save();
    })
    .then(() => res.redirect(`/freelancers/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/freelancers/${req.params.id}/edit`, err.toString());
      next(err);
    });
}
//delete
function deleteRoute(req, res, next) {
  Freelancer
    .findById(req.params.id)
    .exec()
    .then(freelancer => {
      if(!freelancer) return res.notFound();
      if(!freelancer.belongsTo(req.user)) return res.unauthorized('You do not have permission to delete that resource');
      return freelancer.remove();
    })
    .then(() => res.redirect('/freelancers'))
    .catch(next);
}
//CREATECOMMENT

function createCommentRoute(req, res, next) {
  Freelancer
    .findById(req.params.id)
    .exec()
    .then(freelancer => {
      if (!freelancer) return res.notFound();

      req.body.createdBy = req.user;
      freelancer.comments.push(req.body);

      return freelancer.save();
    })
    .then(() => res.redirect(`/freelancers/${req.params.id}`))
    .catch((err) => {
      if (err.name === 'ValidationError') res.badRequest(`/freelancers/${req.params.id}`, err.toString());
      next(err);
    });
}

//DELETECOMMENT
function deleteCommentRoute(req, res, next) {
  Freelancer
    .findById(req.params.id)
    .exec()
    .then(freelancer => {
      if (!freelancer) return res.notFound();
      if (!freelancer.belongsTo(req.user)) return res.unauthorized('You do not have permission to delete that resource');
      freelancer.comments.id(req.params.commentId).remove();

      return freelancer.save();
    })
    .then(freelancer => res.redirect(`/freelancers/${freelancer.id}`))
    .catch(next);
}



module.exports = {
  index: freelancersIndex,
  new: freelancersNew,
  create: freelancersCreate,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute
};
