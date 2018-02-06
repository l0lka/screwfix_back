const express = require('express');


const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

const router = express.Router();
const Order = require('../../models/order');

router.get('/', ensureLoggedIn, (req, res, next) => {
  console.log('____get___', req.user);

  Order.find({user_id: req.user.id}, (err, orders)=>{
    if (err) { return next(err) }
    res.render('orders', { title: 'Orders', orders })
  })
});

module.exports = router;