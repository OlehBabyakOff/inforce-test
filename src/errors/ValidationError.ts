import { BaseError } from './BaseError.js';
import { VALIDATION_ERRORS } from '../constants/errors.js';

import type { ErrorPayload } from './interfaces/errorPayload.js';

export class ValidationError extends BaseError {
  constructor(statusCode: number, status: string, payload: ErrorPayload = {}) {
    super(statusCode, status, payload);
  }

  static INVALID_PARAMS(message?: string) {
    return new this(
      VALIDATION_ERRORS.INVALID_PARAMS.statusCode,
      VALIDATION_ERRORS.INVALID_PARAMS.status,
      {
        message: message || VALIDATION_ERRORS.INVALID_PARAMS.message,
        contextFn: this.INVALID_PARAMS,
      },
    );
  }

  static INVALID_ENV(message?: string) {
    return new this(
      VALIDATION_ERRORS.INVALID_ENV.statusCode,
      VALIDATION_ERRORS.INVALID_ENV.status,
      {
        message: message || VALIDATION_ERRORS.INVALID_ENV.message,
        contextFn: this.INVALID_ENV,
      },
    );
  }
}

