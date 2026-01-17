// Success Response Handler
const sendSuccess = (res, statusCode = 200, message = 'Success', data = null) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  });
};

// Error Response Handler
const sendError = (res, statusCode = 500, message = 'Internal Server Error', details = null) => {
  res.status(statusCode).json({
    success: false,
    message,
    ...(details && { details }),
    timestamp: new Date().toISOString(),
  });
};

// Validation Error Handler
const sendValidationError = (res, message = 'Validation Error', errors = null) => {
  res.status(400).json({
    success: false,
    message,
    ...(errors && { errors }),
    timestamp: new Date().toISOString(),
  });
};

// Not Found Handler
const sendNotFound = (res, message = 'Resource not found') => {
  res.status(404).json({
    success: false,
    message,
    timestamp: new Date().toISOString(),
  });
};

module.exports = {
  sendSuccess,
  sendError,
  sendValidationError,
  sendNotFound,
};
