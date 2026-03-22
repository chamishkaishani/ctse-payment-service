const express = require('express');
const { body, param } = require('express-validator');
const {
  processPayment,
  getPaymentsByUser,
  getAllPayments,
} = require('../controllers/paymentController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// POST /payments
router.post(
  '/',
  protect,
  [
    body('orderId').trim().notEmpty().withMessage('orderId is required'),
    body('userId').trim().notEmpty().withMessage('userId is required'),
    body('amount').isFloat({ gt: 0 }).withMessage('amount must be greater than 0'),
    body('currency').optional().isLength({ min: 3, max: 3 }).withMessage('currency must be 3 letters'),
    body('paymentMethod')
      .optional()
      .isIn(['card', 'cash_on_delivery', 'bank_transfer'])
      .withMessage('Invalid payment method'),
  ],
  processPayment
);

// GET /payments/:userIdf
router.get(
  '/:userId',
  protect,
  [param('userId').trim().notEmpty().withMessage('userId is required')],
  getPaymentsByUser
);

// GET /payments (admin only)
router.get('/', protect, adminOnly, getAllPayments);

module.exports = router;
