// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

// Cart Status
export const CART_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

// Message Type
export const MESSAGE_TYPE = {
  TEXT: 'text',
  SYSTEM: 'system',
  NOTIFICATION: 'notification',
};

// Payment Method
export const PAYMENT_METHOD = {
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'debit_card',
  BANK_TRANSFER: 'bank_transfer',
  UPI: 'upi',
  CASH: 'cash',
};

// API Status Codes
export const API_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_ERROR: 500,
};
