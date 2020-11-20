const { Schema, model } = require('mongoose');

const schemaOrders = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  title: {
    type:String,
    required: true,
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
