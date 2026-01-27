const CartMessage = require('../models/CartMessage.model');
const Cart = require('../models/Cart.model');
const { validateMongoId } = require('../utils/validators');
const logger = require('../utils/logger');

/**
 * Send message to cart
 */
const sendMessage = async (req, res, next) => {
  try {
    const { cartId } = req.params;
    const { content, messageType = 'text' } = req.body;

    if (!validateMongoId(cartId)) {
      return res.status(400).json({ message: 'Invalid cart ID' });
    }

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'Message content cannot be empty' });
    }

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const message = new CartMessage({
      cart: cartId,
      sender: req.user.userId,
      content,
      messageType,
    });

    await message.save();
    await message.populate('sender');

    res.status(201).json({
      message: 'Message sent successfully',
      data: message,
    });
  } catch (error) {
    logger.error('Send message error:', error.message);
    next(error);
  }
};

/**
 * Get cart messages
 */
const getCartMessages = async (req, res, next) => {
  try {
    const { cartId } = req.params;
    const { page = 1, limit = 50 } = req.query;

    if (!validateMongoId(cartId)) {
      return res.status(400).json({ message: 'Invalid cart ID' });
    }

    const skip = (page - 1) * limit;

    const messages = await CartMessage.find({ cart: cartId })
      .populate('sender')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await CartMessage.countDocuments({ cart: cartId });

    res.json({
      messages: messages.reverse(),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    logger.error('Get cart messages error:', error.message);
    next(error);
  }
};

/**
 * Edit message
 */
const editMessage = async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const { content } = req.body;

    if (!validateMongoId(messageId)) {
      return res.status(400).json({ message: 'Invalid message ID' });
    }

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'Message content cannot be empty' });
    }

    const message = await CartMessage.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    if (message.sender.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Only message sender can edit' });
    }

    message.content = content;
    message.isEdited = true;
    message.editedAt = new Date();

    await message.save();
    await message.populate('sender');

    res.json({
      message: 'Message edited successfully',
      data: message,
    });
  } catch (error) {
    logger.error('Edit message error:', error.message);
    next(error);
  }
};

/**
 * Delete message
 */
const deleteMessage = async (req, res, next) => {
  try {
    const { messageId } = req.params;

    if (!validateMongoId(messageId)) {
      return res.status(400).json({ message: 'Invalid message ID' });
    }

    const message = await CartMessage.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    if (message.sender.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Only message sender can delete' });
    }

    await CartMessage.findByIdAndDelete(messageId);

    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    logger.error('Delete message error:', error.message);
    next(error);
  }
};

module.exports = {
  sendMessage,
  getCartMessages,
  editMessage,
  deleteMessage,
};
