const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./api/routes/index');
const user = require('./api/routes/user');
const orders = require('./api/routes/orders');
const orders_page = require('./api/routes/admin/orders');
const connectDatabase = require('./db/database');
const logger = require('morgan');
const path = require('path');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const flash = require('connect-flash');
const config = require('./config');

require('dotenv').config();

dotenv.load();

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(logger('dev'));
connectDatabase();

// Configure Passport to use Auth0
// This will configure Passport to use Auth0

const strategy = new Auth0Strategy({
  domain:       process.env.AUTH0_DOMAIN || config.AUTH0_DOMAIN,
  clientID:     process.env.AUTH0_CLIENT_ID || config.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET || config.AUTH0_CLIENT_SECRET,
  callbackURL:  process.env.AUTH0_CALLBACK_URL || config.callbackURL || config.localCallbackURL
}, function(accessToken, refreshToken, extraParams, profile, done) {
  // accessToken is the token to call Auth0 API (not needed in the most cases)
  // extraParams.id_token has the JSON Web Token
  // profile has all the information from the user
  return done(null, profile);
});

passport.use(strategy);

// This can be used to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(session({
  secret: process.env.SECRET || config.secret,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

// Handle auth failure error messages
app.use(function(req, res, next) {
  if (req && req.query && req.query.error) {
    req.flash("error", req.query.error);
  }
  if (req && req.query && req.query.error_description) {
    req.flash("error_description", req.query.error_description);
  }
  next();
});

// Check logged in
app.use(function(req, res, next) {
  res.locals.loggedIn = false;
  if (req.session.passport && typeof req.session.passport.user != 'undefined') {
    res.locals.loggedIn = true;
    console.log('Check  login ...', req.session)
  }
  next();
});

app.use('/', router);
app.use('/user', user);

app.use('/admin/orders', orders_page);
app.use('/api/orders', orders);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Example app listening on port 3000!');
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

