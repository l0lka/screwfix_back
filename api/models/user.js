const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

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
  },
  displayName: String,
  user_id: String,
  picture: String,
},
  {
    collection: 'users',

  });

mySchema.plugin(uniqueValidator);

var User = mongoose.model('User', mySchema);
module.exports = User;
