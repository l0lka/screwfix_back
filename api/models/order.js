const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const orderSchema = new Schema({
  id: String,
  date: String,
  products: [Schema.Types.Mixed],
  items: Number,
  summ: String,
  delivery: String,
  total: String,
  deliveryStatus: String,
  feedback: Schema.Types.Mixed,
  data: {},
  user_id: String,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('order', orderSchema);