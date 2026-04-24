import { BaseError } from './BaseError.js';
import { AUTH_ERRORS } from '../constants/errors.js';

import type { ErrorPayload } from './interfaces/errorPayload.js';

export class AuthError extends BaseError {
  constructor(statusCode: number, status: string, payload: ErrorPayload = {}) {
    super(statusCode, status, payload);
  }

  static UNAUTHORIZED(message?: string) {
    return new this(AUTH_ERRORS.UNAUTHORIZED.statusCode, AUTH_ERRORS.UNAUTHORIZED.status, {
      message: message || AUTH_ERRORS.UNAUTHORIZED.message,
      contextFn: this.UNAUTHORIZED,
    });
  }

  static FORBIDDEN(message?: string) {
    return new this(AUTH_ERRORS.FORBIDDEN.statusCode, AUTH_ERRORS.FORBIDDEN.status, {
      message: message || AUTH_ERRORS.FORBIDDEN.message,
      contextFn: this.FORBIDDEN,
    });
  }

  static TOKEN_EXPIRED(message?: string) {
    return new this(AUTH_ERRORS.TOKEN_EXPIRED.statusCode, AUTH_ERRORS.TOKEN_EXPIRED.status, {
      message: message || AUTH_ERRORS.TOKEN_EXPIRED.message,
      contextFn: this.TOKEN_EXPIRED,
    });
  }

  static INVALID_TOKEN(message?: string) {
    return new this(AUTH_ERRORS.INVALID_TOKEN.statusCode, AUTH_ERRORS.INVALID_TOKEN.status, {
      message: message || AUTH_ERRORS.INVALID_TOKEN.message,
      contextFn: this.INVALID_TOKEN,
    });
  }

  static INVALID_CREDENTIALS(message?: string) {
    return new this(
      AUTH_ERRORS.INVALID_CREDENTIALS.statusCode,
      AUTH_ERRORS.INVALID_CREDENTIALS.status,
      {
        message: message || AUTH_ERRORS.INVALID_CREDENTIALS.message,
        contextFn: this.INVALID_CREDENTIALS,
      },
    );
  }
}

