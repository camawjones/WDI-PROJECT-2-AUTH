const Freelancer = require('../models/freelancer');
const skill = [
  'Graphic Design',
  'Web Developer',
  'Animator',
  'PR/Marketing',
  'App developer',
  'UX Designer'
];

function freelancersIndex(req, res, next) {
  Freelancer
    .find()
    .then((freelancers) => res.render('freelancers/index', { freelancers }))
    .catch(next);
}

function freelancersNew(req, res) {
  res.render('freelancers/new', { skill });
}

function freelancersCreate(req, res, next) {
  Freelancer
    .create(req.body)
    .then(() => res.redirect('/freelancers'))
    .catch(next);
}

// function freelancersShow(req, res, next) {
//   Freelancer
//     .findById(req.params.id)
//     .populate('director cast')
//     .then((film) => {
//       if(!film) return res.status(404).render('statics/404');
//       res.render('films/show', { film });
//     })
//     .catch(next);
// }
//
// function filmsEdit(req, res, next) {
//   Film
//     .findById(req.params.id)
//     .then((film) => {
//       if(!film) return res.status(404).render('statics/404');
//       res.render('films/edit', { film, genres });
//     })
//     .catch(next);
// }
//
// function filmsUpdate(req, res, next) {
//   Film
//     .findById(req.params.id)
//     .then((film) => {
//       if(!film) return res.status(404).render('statics/404');
//
//       for(const field in req.body) {
//         film[field] = req.body[field];
//       }
//
//       return film.save();
//     })
//     .then((film) => res.redirect(`/films/${film.id}`))
//     .catch(next);
// }
//
// function filmsDelete(req, res, next) {
//   Film
//     .findById(req.params.id)
//     .then((film) => {
//       if(!film) return res.status(404).render('statics/404');
//       return film.remove();
//     })
//     .then(() => res.redirect('/films'))
//     .catch(next);
// }

module.exports = {
  index: freelancersIndex,
  new: freelancersNew,
  create: freelancersCreate
};
