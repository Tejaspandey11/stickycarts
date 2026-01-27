export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const CART_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

export const MESSAGE_TYPE = {
  TEXT: 'text',
  SYSTEM: 'system',
  NOTIFICATION: 'notification',
};
