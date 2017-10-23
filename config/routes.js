const express = require('express');
const router  = express.Router();
// const statics = require('../controllers/statics');
const registrations = require('../controllers/registration');
const sessions = require('../controllers/session');
const freelancers = require('../controllers/freelancers');
const secureRoute = require('../lib/secureRoute');

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

// INDEX
router.get('/', (req, res) => res.render('statics/homepage'));

// // NEW
router.route('/freelancers/new')
  .get(secureRoute, freelancers.new);

// SHOW
router.route('/freelancers/:id')
  .get(freelancers.show)
  .put(secureRoute, freelancers.update)
  .delete(secureRoute, freelancers.delete);

// CREATE
router.route('/freelancers')
  .get(freelancers.index)
  .post(secureRoute, freelancers.create);

// EDIT
router.route('/freelancers/:id/edit')
  .get(secureRoute, freelancers.edit);

router.route('/freelancers/:id/comments')
  .post(secureRoute, freelancers.createComment)
  .delete(secureRoute, freelancers.deleteComment);

router.route('/profile/edit')
  .get(secureRoute, registrations.edit);
// UPDATE
router.route('/profile')
  .get(secureRoute, registrations.show)
  .put(secureRoute, registrations.update)
  .delete(secureRoute, registrations.delete);
//secureRoute

router.route('/freelancers/:id')
  .get(freelancers.show)
  .put(secureRoute, freelancers.update)
  .delete(secureRoute, freelancers.delete);

// DELETE
router.route('/logout')
  .get(sessions.delete);

//login
router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.all('*', (req, res) => res.notFound());

module.exports = router;
