const express = require('express');

// import express from 'express';
let router = express.Router();

import User from '../models/user';

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
  // res.send('Hello');
});

module.exports = router;