export const INTERNAL_ERRORS = {
  INTERNAL_SERVER_ERROR: {
    message: 'Internal Server Error',
    status: 'INTERNAL_SERVER_ERROR',
    statusCode: 500,
  },
};

export const VALIDATION_ERRORS = {
  INVALID_PARAMS: {
    message: 'Invalid parameters',
    status: 'INVALID_PARAMS',
    statusCode: 400,
  },

  INVALID_ENV: {
    message: 'Environment variables validation failed',
    status: 'INVALID_ENV',
    statusCode: 500,
  },
};

export const AUTH_ERRORS = {
  TOKEN_EXPIRED: {
    message: 'Token has expired',
    status: 'TOKEN_EXPIRED',
    statusCode: 401,
  },

  INVALID_TOKEN: {
    message: 'Invalid token',
    status: 'INVALID_TOKEN',
    statusCode: 401,
  },

  INVALID_CREDENTIALS: {
    message: 'Invalid credentials',
    status: 'INVALID_CREDENTIALS',
    statusCode: 401,
  },

  UNAUTHORIZED: {
    statusCode: 401,
    status: 'UNAUTHORIZED',
    message: 'Unauthorized',
  },

  FORBIDDEN: {
    statusCode: 403,
    status: 'FORBIDDEN',
    message: 'Forbidden',
  },
};

export const APP_ERRORS = {
  BAD_REQUEST: {
    statusCode: 400,
    status: 'BAD_REQUEST',
    message: 'Bad request',
  },

  NOT_FOUND: {
    statusCode: 404,
    status: 'NOT_FOUND',
    message: 'Resource not found',
  },
};

