const express = require('express');
const paymentController = require('../controllers/payment.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', authMiddleware, paymentController.createPayment);
router.get('/cart/:cartId', authMiddleware, paymentController.getCartPayments);
router.get('/user/all', authMiddleware, paymentController.getUserPayments);
router.get('/:paymentId', authMiddleware, paymentController.getPaymentById);
router.put('/:paymentId', authMiddleware, paymentController.updatePaymentStatus);
router.delete('/:paymentId', authMiddleware, paymentController.deletePayment);

module.exports = router;
