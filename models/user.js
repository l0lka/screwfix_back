var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

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