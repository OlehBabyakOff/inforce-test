import { BaseError } from './BaseError.js';
import { APP_ERRORS } from '../constants/errors.js';

import type { ErrorPayload } from './interfaces/errorPayload.js';

export class AppError extends BaseError {
  constructor(statusCode: number, status: string, payload: ErrorPayload = {}) {
    super(statusCode, status, payload);
  }

  static BAD_REQUEST(message?: string) {
    return new this(APP_ERRORS.BAD_REQUEST.statusCode, APP_ERRORS.BAD_REQUEST.status, {
      message: message || APP_ERRORS.BAD_REQUEST.message,
      contextFn: this.BAD_REQUEST,
    });
  }

  static NOT_FOUND(message?: string) {
    return new this(APP_ERRORS.NOT_FOUND.statusCode, APP_ERRORS.NOT_FOUND.status, {
      message: message || APP_ERRORS.NOT_FOUND.message,
      contextFn: this.NOT_FOUND,
    });
  }

  static UNAUTHORIZED(message?: string) {
    return new this(APP_ERRORS.UNAUTHORIZED.statusCode, APP_ERRORS.UNAUTHORIZED.status, {
      message: message || APP_ERRORS.UNAUTHORIZED.message,
      contextFn: this.UNAUTHORIZED,
    });
  }

  static FORBIDDEN(message?: string) {
    return new this(APP_ERRORS.FORBIDDEN.statusCode, APP_ERRORS.FORBIDDEN.status, {
      message: message || APP_ERRORS.FORBIDDEN.message,
      contextFn: this.FORBIDDEN,
    });
  }
}

