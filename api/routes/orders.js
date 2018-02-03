import express from 'express';
let router = express.Router();
import Order from '../models/order';

const orders = router.get('/', (req, res, next) => {
  Order.find((err, orders)=>{
    if(err) { return next(err) }
    res.json(orders);
  });
});

export default orders;
