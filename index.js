const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./api/routes/index');
const orders = require('./api/routes/orders');
const orders_page = require('./api/routes/admin/orders');
const connectDatabase = require('./db/database');
const logger = require('morgan');
const path = require('path');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(logger('dev'));
connectDatabase();

app.use('/', router);


app.use('/admin/orders', orders_page);
app.use('/api/orders', orders);

const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Example app listening on port 3000!');
});

app.set('view engine', 'pug');

function unless(paths, middleware) {
  return function(req, res, next) {
    let isHave = false;
    paths.forEach(path => {
      if (path === req.path || req.path.includes(path)) {
        isHave = true;
        return;
      }
    });
    if (isHave) {
      return next();
    } else {
      return middleware(req, res, next);
    }
  };
}

function getMessage(id, req, res) {
  Message.findById(id, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
}

function createToken(username) {
  var token = jwt.sign(
    {
      username: username,
      xsrfToken: crypto
        .createHash('md5')
        .update(username)
        .digest('hex'),
    },
    'jwtSecret',
    {
      expiresIn: 60 * 60,
    },
  );

  return token;
}
