const mongoose = require('mongoose');
const config = require('../config');

const dbUrl = process.env.MONGODB_URI || config.database;

module.exports = () => {
  mongoose.connect(dbUrl).then(
    () => {
      console.log(`MongoDB is connected.`);
      },
    err => {
      console.log(`Mongoose Connection ERROR: ${err}`);
    }
  );
}