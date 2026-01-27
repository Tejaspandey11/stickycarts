const express = require('express');
const cartItemController = require('../controllers/cartItem.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/:cartId/items', authMiddleware, cartItemController.addCartItem);
router.get('/:cartId/items', authMiddleware, cartItemController.getCartItems);
router.get('/items/:itemId', authMiddleware, cartItemController.getCartItemById);
router.put('/items/:itemId', authMiddleware, cartItemController.updateCartItem);
router.delete('/items/:itemId', authMiddleware, cartItemController.deleteCartItem);

module.exports = router;
