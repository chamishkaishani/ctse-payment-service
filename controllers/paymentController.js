const { validationResult } = require('express-validator');
const Payment = require('../models/Payment');

const buildTransactionId = () => `TXN-${Date.now()}-${Math.floor(Math.random() * 100000)}`;

// @desc    Create/process a payment
// @route   POST /payments
// @access  Private
const processPayment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { orderId, userId, amount, paymentMethod, currency } = req.body;

  // Non-admin users can only submit payments for themselves.
  if (req.user.role !== 'admin' && req.user._id !== userId) {
    return res.status(403).json({ message: 'You can only create payments for your own account' });
  }

  try {
    const payment = await Payment.create({
      orderId,
      userId,
      amount,
      paymentMethod,
      currency,
      paymentStatus: amount > 0 ? 'paid' : 'failed',
      transactionId: amount > 0 ? buildTransactionId() : null,
    });

    return res.status(201).json({
      success: true,
      message: payment.paymentStatus === 'paid' ? 'Payment processed successfully' : 'Payment failed',
      payment,
    });
  } catch (error) {
    console.error('Process Payment Error:', error.message);
    return res.status(500).json({ message: 'Server error while processing payment' });
  }
};

// @desc    Get payments by user
// @route   GET /payments/:userId
// @access  Private
const getPaymentsByUser = async (req, res) => {
  const { userId } = req.params;

  if (req.user.role !== 'admin' && req.user._id !== userId) {
    return res.status(403).json({ message: 'You can only view your own payments' });
  }

  try {
    const payments = await Payment.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: payments.length,
      payments,
    });
  } catch (error) {
    console.error('Get Payments By User Error:', error.message);
    return res.status(500).json({ message: 'Server error while fetching payments' });
  }
};

// @desc    Get all payments
// @route   GET /payments
// @access  Private/Admin
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find({}).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: payments.length,
      payments,
    });
  } catch (error) {
    console.error('Get All Payments Error:', error.message);
    return res.status(500).json({ message: 'Server error while fetching all payments' });
  }
};

module.exports = {
  processPayment,
  getPaymentsByUser,
  getAllPayments,
};
