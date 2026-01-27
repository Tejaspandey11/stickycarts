const express = require('express');
const cartController = require('../controllers/cart.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', authMiddleware, cartController.createCart);
router.get('/', authMiddleware, cartController.getUserCarts);
router.get('/:cartId', authMiddleware, cartController.getCartById);
router.put('/:cartId', authMiddleware, cartController.updateCart);
router.delete('/:cartId', authMiddleware, cartController.deleteCart);
router.post('/:cartId/members', authMiddleware, cartController.addMember);
router.delete('/:cartId/members/:memberId', authMiddleware, cartController.removeMember);

module.exports = router;
