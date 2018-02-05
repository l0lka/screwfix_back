const mongoose = require('mongoose');
const config = require('../config');

// import mongoose from 'mongoose';
// import config from '../config';

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