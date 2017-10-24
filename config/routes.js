const express = require('express');
const router  = express.Router();
// const statics = require('../controllers/statics');
const authentications = require('../controllers/authentications');
const sessions = require('../controllers/sessions');
const users = require('../controllers/users');
const secureRoute = require('../lib/secureRoute');

router.route('/register')
  .get(authentications.new)
  .post(authentications.create);

// INDEX
router.get('/', (req, res) => res.render('statics/homepage'));

router.route('/users')
  .get(secureRoute, users.index);

router.route('/users/:id/edit')
  .get(secureRoute, users.edit);

router.route('/profile')
  .get(secureRoute, users.profile);

// UPDATE
router.route('/users/:id')
  .get(secureRoute, users.show)
  .put(secureRoute, users.update);

router.route('/users/:id/reviews')
  .post(secureRoute, users.createReview)
  .delete(secureRoute, users.deleteReview);

// router.route('/users/:id/skills')
//   .post(secureRoute, users.skillsUpdate);


// DELETE
router.route('/logout')
  .get(sessions.delete);

//login
router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.all('*', (req, res) => res.notFound());

module.exports = router;
