const mongoose = require('mongoose');

const paymentOrderSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
  },
  razorpay_signature: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['created', 'paid', 'failed'],
    default: 'created',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('PaymentOrder', paymentOrderSchema);
