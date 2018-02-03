import express from 'express';
import bodyParser from 'body-parser';
import router from './api/routes/index';
import orders from './api/routes/orders';
import connectDatabase from './db/database';
import logger from 'morgan'
import path from 'path'

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger('dev'));
connectDatabase();

app.use('/', router);
app.use('/api/orders', orders);

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Example app listening on port 3000!')
});

//
// import cache from 'express-cache-headers'
// import compression from 'compression'
// import express from 'express'
// import logger from 'morgan'
// import path from 'path'
//
// import routes from './routes/routes'
// import apiRoutes from './routes/api-routes'
// import attachSocket from './sockets'
// import connectDatabase from './database'
//
// const port = process.env.PORT || 3000
//
// let app = express()
//
// app.use(cache(60))
// app.use(compression())
// app.use(logger('dev'))
// app.use(express.static(path.join(__dirname, 'assets', 'build')))
// apiRoutes(app)
// routes(app)
// connectDatabase()
//
// let server = app.listen(port, () => {
//   attachSocket(server)
//   console.log(`Listening on http://localhost:${port}`)
// })


function unless (paths, middleware) {
  return function(req, res, next) {
    let isHave = false;
    paths.forEach((path) => {
      if (path === req.path || req.path.includes(path)) {
        isHave = true;
        return;
      }
    });
    if (isHave) {
      return next()
    } else {
      return middleware(req, res, next)
    }
  }
}

function getMessage (id, req, res) {
  Message.findById(id, function(err, post){

    if (err) return next(err);
    res.json(post);
  });
}

function createToken(username) {

  var token = jwt.sign({
    username: username,
    xsrfToken: crypto.createHash('md5').update(username).digest('hex')
  }, 'jwtSecret', {
    expiresIn: 60*60
  });

  return token;
}

