const express = require('express');

let router = express.Router();

const Order = require('../../models/order');

router.get('/', (req, res, next) => {
  Order.find((err, orders)=>{
    if (err) { return next(err) }
    res.render('orders', { title: 'Orders', orders })
  })
});

module.exports = router;