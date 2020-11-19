const { Schema, model } = require('mongoose');

const schemaOrders = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId,
  },
});

const Orders = model('orders', schemaOrders);
module.exports = Orders;
