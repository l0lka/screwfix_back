const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// import mongoose from 'mongoose';
// import uniqueValidator from 'mongoose-unique-validator';

var mySchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    userId: mongoose.Schema.ObjectId
  },
  password: {
    type: String,
    required: true
  }
}, {
  collection: 'users'
});

mySchema.plugin(uniqueValidator);

var User = mongoose.model('User', mySchema);
module.exports = User;