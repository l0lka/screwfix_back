import express from 'express';
let router = express.Router();

import Order from '../../models/order';

const order = router.get('/', (req, res, next) => {
  Order.find((err, orders)=>{
    if (err) { return next(err) }
    res.render('orders', { title: 'Orders', orders })
  })
});

export default order;