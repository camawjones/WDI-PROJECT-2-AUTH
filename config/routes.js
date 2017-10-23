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

router.route('/users/:id/edit')
  .get(secureRoute, users.edit);

// UPDATE
router.route('/users/:id')
  .get(secureRoute, users.show)
  .put(secureRoute, users.update);


router.route('/users/:id/comments')
  .post(secureRoute, users.createComment)
  .delete(secureRoute, users.deleteComment);

// DELETE
router.route('/logout')
  .get(sessions.delete);

//login
router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.all('*', (req, res) => res.notFound());

module.exports = router;
