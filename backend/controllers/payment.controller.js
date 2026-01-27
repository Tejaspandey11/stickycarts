const Payment = require('../models/Payment.model');
const CartItem = require('../models/CartItem.model');
const Cart = require('../models/Cart.model');
const { validateMongoId, validateAmount } = require('../utils/validators');
const logger = require('../utils/logger');

/**
 * Create payment
 */
const createPayment = async (req, res, next) => {
  try {
    const { cartId, cartItemId, receiverId, amount, paymentMethod = 'credit_card', notes } =
      req.body;

    if (!validateMongoId(cartId)) {
      return res.status(400).json({ message: 'Invalid cart ID' });
    }

    if (!validateAmount(amount)) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const payment = new Payment({
      cart: cartId,
      ...(cartItemId && { cartItem: cartItemId }),
      payer: req.user.userId,
      receiver: receiverId,
      amount,
      paymentMethod,
      notes,
    });

    await payment.save();
    await payment.populate(['payer', 'receiver', 'cart']);

    res.status(201).json({
      message: 'Payment created successfully',
      payment,
    });
  } catch (error) {
    logger.error('Create payment error:', error.message);
    next(error);
  }
};

/**
 * Get payments for cart
 */
const getCartPayments = async (req, res, next) => {
  try {
    const { cartId } = req.params;
    const { status } = req.query;

    if (!validateMongoId(cartId)) {
      return res.status(400).json({ message: 'Invalid cart ID' });
    }

    const query = { cart: cartId };
    if (status) query.status = status;

    const payments = await Payment.find(query).populate(['payer', 'receiver']);

    res.json(payments);
  } catch (error) {
    logger.error('Get cart payments error:', error.message);
    next(error);
  }
};

/**
 * Get user payments
 */
const getUserPayments = async (req, res, next) => {
  try {
    const { status } = req.query;

    const query = {
      $or: [{ payer: req.user.userId }, { receiver: req.user.userId }],
    };

    if (status) query.status = status;

    const payments = await Payment.find(query).populate(['payer', 'receiver', 'cart']);

    res.json(payments);
  } catch (error) {
    logger.error('Get user payments error:', error.message);
    next(error);
  }
};

/**
 * Get payment by ID
 */
const getPaymentById = async (req, res, next) => {
  try {
    const { paymentId } = req.params;

    if (!validateMongoId(paymentId)) {
      return res.status(400).json({ message: 'Invalid payment ID' });
    }

    const payment = await Payment.findById(paymentId).populate(['payer', 'receiver']);

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json(payment);
  } catch (error) {
    logger.error('Get payment by ID error:', error.message);
    next(error);
  }
};

/**
 * Update payment status
 */
const updatePaymentStatus = async (req, res, next) => {
  try {
    const { paymentId } = req.params;
    const { status, transactionId } = req.body;

    if (!validateMongoId(paymentId)) {
      return res.status(400).json({ message: 'Invalid payment ID' });
    }

    const validStatuses = ['pending', 'completed', 'failed', 'refunded'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid payment status' });
    }

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    if (payment.payer.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Only payer can update payment' });
    }

    payment.status = status;
    if (transactionId) payment.transactionId = transactionId;

    await payment.save();
    await payment.populate(['payer', 'receiver']);

    // Update cart item if associated
    if (payment.cartItem) {
      const cartItem = await CartItem.findById(payment.cartItem);
      if (cartItem && status === 'completed') {
        const splitDetail = cartItem.splitAmong.find(
          s => s.userId.toString() === payment.receiver.toString()
        );
        if (splitDetail) {
          splitDetail.isPaid = true;
        }
        await cartItem.save();
      }
    }

    res.json({
      message: 'Payment status updated successfully',
      payment,
    });
  } catch (error) {
    logger.error('Update payment status error:', error.message);
    next(error);
  }
};

/**
 * Delete payment
 */
const deletePayment = async (req, res, next) => {
  try {
    const { paymentId } = req.params;

    if (!validateMongoId(paymentId)) {
      return res.status(400).json({ message: 'Invalid payment ID' });
    }

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    if (payment.payer.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Only payer can delete payment' });
    }

    if (payment.status === 'completed') {
      return res.status(400).json({ message: 'Cannot delete completed payment' });
    }

    await Payment.findByIdAndDelete(paymentId);

    res.json({ message: 'Payment deleted successfully' });
  } catch (error) {
    logger.error('Delete payment error:', error.message);
    next(error);
  }
};

module.exports = {
  createPayment,
  getCartPayments,
  getUserPayments,
  getPaymentById,
  updatePaymentStatus,
  deletePayment,
};
