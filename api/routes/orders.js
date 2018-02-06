const express = require('express');
const Order = require('../models/order');
const passport = require('passport');
const cors = require('cors');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

let router = express.Router();

router.use(cors());

router.get('/', ensureLoggedIn, (req, res, next) => {
  console.log('____get___', req.user);


  Order.find({user_id: req.user.id}, (err, orders) => {
    if (err) {
      return next(err);
    }
    res.json(orders);
  });
});

router.post('/', (req, res, next) => {
  const data = req.body;
  const obj = Object.assign({}, data, {user_id: req.user.user_id});

  let order = new Order(
    obj
  );

  order.save(function(err, order, numAffected) {
    res.json(order);
  });
});

router.delete('/:id', ensureLoggedIn, (req, res, next) => {
  console.log(req.params.id)
  Order.findByIdAndRemove(req.params.id, (err, order) => {
    if (err) return next(err);
    res.json(order);
  })
});

module.exports = router;
