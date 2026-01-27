const Cart = require('../models/Cart.model');
const CartItem = require('../models/CartItem.model');
const { validateMongoId, validateCartName } = require('../utils/validators');
const logger = require('../utils/logger');

/**
 * Create a new cart
 */
const createCart = async (req, res, next) => {
  try {
    const { name, description, category, dueDate } = req.body;

    if (!validateCartName(name)) {
      return res.status(400).json({ message: 'Invalid cart name' });
    }

    const cart = new Cart({
      name,
      description,
      category,
      dueDate,
      owner: req.user.userId,
      members: [req.user.userId],
    });

    await cart.save();
    await cart.populate(['owner', 'members']);

    res.status(201).json({
      message: 'Cart created successfully',
      cart,
    });
  } catch (error) {
    logger.error('Create cart error:', error.message);
    next(error);
  }
};

/**
 * Get all carts for user
 */
const getUserCarts = async (req, res, next) => {
  try {
    const carts = await Cart.find({
      $or: [{ owner: req.user.userId }, { members: req.user.userId }],
    }).populate(['owner', 'members']);

    res.json(carts);
  } catch (error) {
    logger.error('Get user carts error:', error.message);
    next(error);
  }
};

/**
 * Get cart by ID
 */
const getCartById = async (req, res, next) => {
  try {
    const { cartId } = req.params;

    if (!validateMongoId(cartId)) {
      return res.status(400).json({ message: 'Invalid cart ID' });
    }

    const cart = await Cart.findById(cartId).populate(['owner', 'members']);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.json(cart);
  } catch (error) {
    logger.error('Get cart by ID error:', error.message);
    next(error);
  }
};

/**
 * Update cart
 */
const updateCart = async (req, res, next) => {
  try {
    const { cartId } = req.params;
    const { name, description, category, dueDate, status } = req.body;

    if (!validateMongoId(cartId)) {
      return res.status(400).json({ message: 'Invalid cart ID' });
    }

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    if (cart.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Only cart owner can update' });
    }

    if (name) cart.name = name;
    if (description) cart.description = description;
    if (category) cart.category = category;
    if (dueDate) cart.dueDate = dueDate;
    if (status) cart.status = status;

    await cart.save();
    await cart.populate(['owner', 'members']);

    res.json({
      message: 'Cart updated successfully',
      cart,
    });
  } catch (error) {
    logger.error('Update cart error:', error.message);
    next(error);
  }
};

/**
 * Delete cart
 */
const deleteCart = async (req, res, next) => {
  try {
    const { cartId } = req.params;

    if (!validateMongoId(cartId)) {
      return res.status(400).json({ message: 'Invalid cart ID' });
    }

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    if (cart.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Only cart owner can delete' });
    }

    await Cart.findByIdAndDelete(cartId);
    await CartItem.deleteMany({ cart: cartId });

    res.json({ message: 'Cart deleted successfully' });
  } catch (error) {
    logger.error('Delete cart error:', error.message);
    next(error);
  }
};

/**
 * Add member to cart
 */
const addMember = async (req, res, next) => {
  try {
    const { cartId } = req.params;
    const { memberId } = req.body;

    if (!validateMongoId(cartId) || !validateMongoId(memberId)) {
      return res.status(400).json({ message: 'Invalid IDs' });
    }

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    if (cart.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Only cart owner can add members' });
    }

    if (!cart.members.includes(memberId)) {
      cart.members.push(memberId);
      await cart.save();
    }

    await cart.populate(['owner', 'members']);

    res.json({
      message: 'Member added successfully',
      cart,
    });
  } catch (error) {
    logger.error('Add member error:', error.message);
    next(error);
  }
};

/**
 * Remove member from cart
 */
const removeMember = async (req, res, next) => {
  try {
    const { cartId } = req.params;
    const { memberId } = req.body;

    if (!validateMongoId(cartId) || !validateMongoId(memberId)) {
      return res.status(400).json({ message: 'Invalid IDs' });
    }

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    if (cart.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Only cart owner can remove members' });
    }

    cart.members = cart.members.filter(id => id.toString() !== memberId);
    await cart.save();
    await cart.populate(['owner', 'members']);

    res.json({
      message: 'Member removed successfully',
      cart,
    });
  } catch (error) {
    logger.error('Remove member error:', error.message);
    next(error);
  }
};

module.exports = {
  createCart,
  getUserCarts,
  getCartById,
  updateCart,
  deleteCart,
  addMember,
  removeMember,
};
