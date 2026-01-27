const logger = require('../utils/logger');

const errorMiddleware = (error, req, res, next) => {
  logger.error('Error:', error.message);

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
};

module.exports = errorMiddleware;
