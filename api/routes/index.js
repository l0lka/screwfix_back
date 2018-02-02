import express from 'express';
let router = express.Router();

import User from '../models/user';

router.get('/', (req, res, next) => {
  res.send('Hello');
});

export default router;