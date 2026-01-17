// Custom Error Class
class AppError extends Error {
  constructor(message, statusCode, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Error types
const ErrorTypes = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  BAD_REQUEST: 'BAD_REQUEST',
  DATABASE_ERROR: 'DATABASE_ERROR',
};

// Error messages
const ErrorMessages = {
  INVALID_FIRSTNAME: 'First name is required and must be at least 2 characters',
  INVALID_EMAIL: 'Please provide a valid email address',
  INVALID_MESSAGE: 'Message is required and must be at least 5 characters',
  INVALID_PHONE: 'Phone number must be at least 10 digits if provided',
  CONTACT_NOT_FOUND: 'Contact not found',
  DATABASE_ERROR: 'Database error occurred',
  INTERNAL_SERVER_ERROR: 'An unexpected error occurred',
  ROUTE_NOT_FOUND: 'The requested route does not exist',
};

module.exports = {
  AppError,
  ErrorTypes,
  ErrorMessages,
};
