const express = require('express');
const router  = express.Router();
// const statics = require('../controllers/statics');
const registrations = require('../controllers/registration');
const sessions = require('../controllers/session');
const freelancers = require('../controllers/freelancers');
const secureRoute = require('../lib/secureRoute');








// A home route

// RESTful routes
// All URLS should contain the PLURAL... don't chose octopus or people or something silly.

// router.route('/')
//   .get(statics.home);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

// INDEX
// router.get('/', (req, res) => res.render('statics/index'));
//
// // NEW

// SHOW

// CREATE

// EDIT

// UPDATE

//secureRoute


// router.route('/freelancers/:id')
//   .get(freelancers.show)
//   .put(secureRoute, freelancers.update)
//   .delete(secureRoute, freelancers.delete);

// DELETE
router.route('/logout')
  .get(sessions.delete);

//login
router.route('/login')
  .get(sessions.new)
  .post(sessions.create);


module.exports = router;
