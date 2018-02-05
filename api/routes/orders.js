const express = require('express');
const Order = require('../models/order');

//import express from 'express';
let router = express.Router();
//import Order from '../models/order';

router.get('/', (req, res, next) => {
  Order.find((err, orders) => {
    if (err) {
      return next(err);
    }
    res.json(orders);
  });
});

router.post('/', (req, res, next) => {
  console.log('POST');

  // const userdata =  JSON.parse(req.headers.userdata);
  //
  let data = req.body;
  // data.user = req.user;
  // user = userdata.id;
  console.log('data  ', req.body);
  let order = new Order(
    data,
    //  user
  );
  console.log('order  ', order);

  order.save(function(err, order, numAffected) {
    res.json(order);
  });
});

router.delete('/:id', (req, res, next) => {
  console.log(req.params.id)
  Order.findByIdAndRemove(req.params.id, (err, order) => {
    if (err) return next(err);
    res.json(order);
  })
});

module.exports = router;
