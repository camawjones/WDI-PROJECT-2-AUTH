const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbUri } = require('../config/environment');

mongoose.connect(dbUri, { useMongoClient: true });

// Require the model
const User = require('../models/user');
// Drop the model
User.collection.drop();
// Create the models
User
  .create([{
    name: 'James Johnson',
    occupation: 'Graphic Designer',
    image: '../images/man1.jpg',
    Rating: '5'
  },{},{}])
  .then(users => console.log(`${users.length} users were created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());

const dbURL = process.env.MONGODB_URL ||
'mongodb://localhost/all-the-birds';
mongoose.connect(dbURL);
