const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbUri } = require('../config/environment');

mongoose.connect(dbUri, { useMongoClient: true });

// Require the model
const User = require('../models/user');
const Freelancer = require('../models/freelancer');
// Drop the model
User.collection.drop();
Freelancer.collection.drop();
// Create the models
User
  .create([{
    firstName: 'Cam',
    lastName: 'Jones',
    email: 'cam@cam.com',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users wre created!`);
    return Freelancer
      .create([{
        name: 'Chev Dayson',
        skill1: 'UX Developer',
        image: '../images/man1.jpg',
        Rating: 5
      },
      {
        name: 'Kev Mayson',
        skill1: 'Web Developer',
        image: '../images/man1.jpg',
        Rating: 5
      }]);
  })
  .then((freelancers) => console.log(`${freelancers.length} freelancers were created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());

const dbURL = process.env.MONGODB_URL ||
'mongodb://localhost/all-the-birds';
mongoose.connect(dbURL);
