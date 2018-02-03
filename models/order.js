import mongoose from 'mongoose';
import User from './user';

const Order = mongoose.Schema({
  data: {},
  user_id: String,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

export default mongoose.model('Order', new Order);