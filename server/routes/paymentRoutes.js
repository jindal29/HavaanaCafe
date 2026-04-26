const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Razorpay = require('razorpay');
const PaymentOrder = require('../models/PaymentOrder');

// Initialize Razorpay instance (using dummy test keys if environment variables not set)
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummyKeyId',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummyKeySecret1234567890',
});

// @route   POST /api/payment/create-order
// @desc    Create a new order in Razorpay
// @access  Public
router.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body; // Amount should be in smaller unit, e.g., paise (₹1 = 100 paise)

    if (!amount) {
      return res.status(400).json({ message: 'Amount is required' });
    }

    const options = {
      amount: parseInt(amount * 100), // convert rupees to paise
      currency: 'INR',
      receipt: 'receipt_order_' + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).json({ message: 'Failed to create Razorpay order' });
    }

    // Save order intent in DB
    const newPaymentOrder = new PaymentOrder({
      razorpay_order_id: order.id,
      amount: options.amount,
      status: 'created',
    });

    await newPaymentOrder.save();

    res.status(201).json({
      success: true,
      order: order,
      key: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummyKeyId',
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error processing order creation' });
  }
});

// @route   POST /api/payment/verify
// @desc    Verify payment signature
// @access  Public
router.post('/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const key_secret = process.env.RAZORPAY_KEY_SECRET || 'dummyKeySecret1234567890';

    // Creating expected signature
    const hmac = crypto.createHmac('sha256', key_secret);
    hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
    const expectedSignature = hmac.digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Update the database order to 'paid'
      await PaymentOrder.findOneAndUpdate(
        { razorpay_order_id: razorpay_order_id },
        {
          $set: {
            razorpay_payment_id: razorpay_payment_id,
            razorpay_signature: razorpay_signature,
            status: 'paid',
          },
        }
      );
      
      res.status(200).json({ success: true, message: 'Payment successfully verified' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }
  } catch (error) {
    console.error('Signature validation error:', error);
    res.status(500).json({ success: false, message: 'Error validating payment' });
  }
});

module.exports = router;
