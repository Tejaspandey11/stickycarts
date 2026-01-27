const CartItem = require('../models/CartItem.model');
const Cart = require('../models/Cart.model');
const { validateMongoId, validateAmount } = require('../utils/validators');
const { calculateEqualSplit } = require('../services/costSplit.service');
const logger = require('../utils/logger');

/**
 * Add item to cart
 */
const addCartItem = async (req, res, next) => {
  try {
    const { cartId } = req.params;
    const { itemName, description, price, quantity, splitAmong } = req.body;

    if (!validateMongoId(cartId)) {
      return res.status(400).json({ message: 'Invalid cart ID' });
    }

    if (!validateAmount(price)) {
      return res.status(400).json({ message: 'Invalid price' });
    }

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const totalAmount = price * (quantity || 1);
    let splitDetails = [];

    if (splitAmong && Array.isArray(splitAmong)) {
      splitDetails = splitAmong.map(userId => ({
        userId,
        amount: totalAmount / splitAmong.length,
        isPaid: false,
      }));
    } else {
      splitDetails = calculateEqualSplit(totalAmount, cart.members);
      splitDetails = splitDetails.map(detail => ({
        ...detail,
        isPaid: false,
      }));
    }

    const cartItem = new CartItem({
      cart: cartId,
      itemName,
      description,
      price,
      quantity: quantity || 1,
      addedBy: req.user.userId,
      splitAmong: splitDetails,
      totalAmount,
    });

    await cartItem.save();
    await cartItem.populate('addedBy splitAmong.userId');

    cart.totalAmount += totalAmount;
    await cart.save();

    res.status(201).json({
      message: 'Item added to cart successfully',
      cartItem,
    });
  } catch (error) {
    logger.error('Add cart item error:', error.message);
    next(error);
  }
};

/**
 * Get cart items
 */
const getCartItems = async (req, res, next) => {
  try {
    const { cartId } = req.params;

    if (!validateMongoId(cartId)) {
      return res.status(400).json({ message: 'Invalid cart ID' });
    }

    const cartItems = await CartItem.find({ cart: cartId }).populate([
      'addedBy',
      'splitAmong.userId',
    ]);

    res.json(cartItems);
  } catch (error) {
    logger.error('Get cart items error:', error.message);
    next(error);
  }
};

/**
 * Get cart item by ID
 */
const getCartItemById = async (req, res, next) => {
  try {
    const { itemId } = req.params;

    if (!validateMongoId(itemId)) {
      return res.status(400).json({ message: 'Invalid item ID' });
    }

    const cartItem = await CartItem.findById(itemId).populate([
      'addedBy',
      'splitAmong.userId',
    ]);

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.json(cartItem);
  } catch (error) {
    logger.error('Get cart item by ID error:', error.message);
    next(error);
  }
};

/**
 * Update cart item
 */
const updateCartItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const { itemName, description, price, quantity } = req.body;

    if (!validateMongoId(itemId)) {
      return res.status(400).json({ message: 'Invalid item ID' });
    }

    const cartItem = await CartItem.findById(itemId);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    if (cartItem.addedBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Only item creator can update' });
    }

    if (itemName) cartItem.itemName = itemName;
    if (description) cartItem.description = description;
    if (price && validateAmount(price)) cartItem.price = price;
    if (quantity) cartItem.quantity = quantity;

    if (price || quantity) {
      const newTotal = (price || cartItem.price) * (quantity || cartItem.quantity);
      const oldTotal = cartItem.totalAmount;
      cartItem.totalAmount = newTotal;

      // Update cart total
      const cart = await Cart.findById(cartItem.cart);
      cart.totalAmount = cart.totalAmount - oldTotal + newTotal;
      await cart.save();
    }

    await cartItem.save();
    await cartItem.populate(['addedBy', 'splitAmong.userId']);

    res.json({
      message: 'Cart item updated successfully',
      cartItem,
    });
  } catch (error) {
    logger.error('Update cart item error:', error.message);
    next(error);
  }
};

/**
 * Delete cart item
 */
const deleteCartItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;

    if (!validateMongoId(itemId)) {
      return res.status(400).json({ message: 'Invalid item ID' });
    }

    const cartItem = await CartItem.findById(itemId);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    if (cartItem.addedBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Only item creator can delete' });
    }

    const cart = await Cart.findById(cartItem.cart);
    cart.totalAmount -= cartItem.totalAmount;
    await cart.save();

    await CartItem.findByIdAndDelete(itemId);

    res.json({ message: 'Cart item deleted successfully' });
  } catch (error) {
    logger.error('Delete cart item error:', error.message);
    next(error);
  }
};

module.exports = {
  addCartItem,
  getCartItems,
  getCartItemById,
  updateCartItem,
  deleteCartItem,
};
