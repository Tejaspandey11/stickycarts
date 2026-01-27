const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

const CART_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

const MESSAGE_TYPE = {
  TEXT: 'text',
  SYSTEM: 'system',
  NOTIFICATION: 'notification',
};

module.exports = {
  USER_ROLES,
  CART_STATUS,
  PAYMENT_STATUS,
  MESSAGE_TYPE,
};
