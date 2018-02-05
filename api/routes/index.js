const express = require('express');
const passport = require('passport');
const router = express.Router();

// router.get('/', (req, res, next) => {
//   //res.render('index', { title: 'Hey', message: 'Hello there!' });
//   // res.send('Hello');
// });


// AUTH0_CLIENT_ID='Gn9MQKXEhKaw5DZ05kgFWkRHM3lGClEo',
//   AUTH0_DOMAIN='screwfix.auth0.com',
//   AUTH0_CLIENT_SECRET='ruLulexO2xsbhAw7drTMmq3Hp1ol_rsR4DMwVBShAOqCjFm3HMv9TByamyNkbqZ5'

const env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID || 'Gn9MQKXEhKaw5DZ05kgFWkRHM3lGClEo',
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN || 'screwfix.auth0.com',
  AUTH0_CALLBACK_URL:
  process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});

router.get('/login', passport.authenticate('auth0', {
    clientID: env.AUTH0_CLIENT_ID,
    domain: env.AUTH0_DOMAIN,
    redirectUri: env.AUTH0_CALLBACK_URL,
    responseType: 'code',
    audience: 'https://' + env.AUTH0_DOMAIN + '/userinfo',
    scope: 'openid profile'}),
  function(req, res) {
    res.redirect("/");
  });

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/callback',
  passport.authenticate('auth0', {
    failureRedirect: '/failure'
  }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/user');
  }
);

router.get('/failure', function(req, res) {
  var error = req.flash("error");
  var error_description = req.flash("error_description");
  req.logout();
  res.render('failure', {
    error: error[0],
    error_description: error_description[0],
  });
});

module.exports = router;