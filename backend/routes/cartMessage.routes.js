const express = require('express');
const cartMessageController = require('../controllers/cartMessage.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/:cartId/messages', authMiddleware, cartMessageController.sendMessage);
router.get('/:cartId/messages', authMiddleware, cartMessageController.getCartMessages);
router.put('/:messageId', authMiddleware, cartMessageController.editMessage);
router.delete('/:messageId', authMiddleware, cartMessageController.deleteMessage);

module.exports = router;
