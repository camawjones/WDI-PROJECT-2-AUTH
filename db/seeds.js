const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbUri } = require('../config/environment');

mongoose.connect(dbUri, { useMongoClient: true });

// Require the model
const User = require('../models/user');
const Skill = require('../models/skill');

// Drop the model
User.collection.drop();
Skill.collection.drop();
// Create the models

Skill
  .create([
    { name: 'Graphic Design' },
    { name: 'Web Developer' },
    { name: 'Animator' },
    { name: 'PR/Marketing' },
    { name: 'App developer' },
    { name: 'UX Designer' }
  ])
  .then(skills => {
    console.log(`${skills.length} skills were seeded`);
    return User
      .create([{
        firstName: 'Cam',
        lastName: 'Jones',
        username: 'cam',
        email: 'cam@cam.com',
        password: 'password',
        passwordConfirmation: 'password'
      }]);
  })
  .then((users) => console.log(`${users.length} users were created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
