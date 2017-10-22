const User = require('../models/user');


//write a function that renders the registration form
function registrationNew(req, res){
  return res.render('registration/new');
}

// function registrationCreate(req, res) {
//   User
//     .create(req.body)
//     .then(() => res.redirect('/login'))
//     .catch((err) => {
//       if(err.name === 'ValidationError') return res.badRequest('/register', err.toString());
//       next(err);
//     });
// }

function registrationCreate(req, res) {
  User
    .create(req.body);
  console.log('iv got here')
    .then(() => res.redirect('/'))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).render('registration/new', { message: 'Passwords do not match' });
      }
      res.status(500).end();
    });

}


module.exports = {
  new: registrationNew,
  create: registrationCreate
};
