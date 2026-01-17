// Global Error Middleware
const { sendError } = require('./responseHandler');
const { ErrorMessages } = require('./errorHandler');

const globalErrorHandler = (err, req, res, next) => {
  // Only log errors in development mode
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', err.message);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || ErrorMessages.INTERNAL_SERVER_ERROR;
  const details = err.details || null;

  sendError(res, statusCode, message, details);
};

module.exports = globalErrorHandler;
