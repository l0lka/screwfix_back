const express = require('express');

let router = express.Router();


router.get('/', (req, res, next) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
  // res.send('Hello');
});

module.exports = router;