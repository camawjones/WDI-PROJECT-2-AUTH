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
        image: 'http://fillmurray.com/300/300',
        email: 'cam@cam.com',
        password: 'password',
        passwordConfirmation: 'password'
      }, {
        firstName: 'Dave',
        lastName: 'Jones',
        username: 'dave',
        image: 'http://fillmurray.com/300/300',
        email: 'dave@dave.com',
        password: 'password',
        passwordConfirmation: 'password'
      }, {
        firstName: 'Phillis',
        lastName: 'Jones',
        username: 'phillis',
        image: 'http://fillmurray.com/300/300',
        email: 'phillis@phillis.com',
        password: 'password',
        passwordConfirmation: 'password'
      }, {
        firstName: 'Harry',
        lastName: 'Jones',
        username: 'harry',
        image: 'http://fillmurray.com/300/300',
        email: 'harry@harry.com',
        password: 'password',
        passwordConfirmation: 'password'
      }, {
        firstName: 'Mitesh',
        lastName: 'Jones',
        username: 'mitesh',
        image: 'http://fillmurray.com/300/300',
        email: 'mitesh@mitesh.com',
        password: 'password',
        passwordConfirmation: 'password'
      }]);
  })
  .then((users) => console.log(`${users.length} users were created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
