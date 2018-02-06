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
  user_id: String,
  data: Schema.Types.Mixed,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('order', orderSchema);