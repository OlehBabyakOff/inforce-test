import type { Request, Response } from 'express';

import { logger } from '../infrastructure/logger/pino.js';

import { BaseError } from '../errors/BaseError.js';
import { INTERNAL_ERRORS } from '../constants/errors.js';

export function errorHandler() {
  return (err: Error, req: Request, res: Response) => {
    if (err instanceof BaseError) {
      logger.error(err.message, err);

      if (err.statusCode < 500) {
        return res.status(err.statusCode).json({
          error: {
            status: err.status,
            message: err.message,
          },
        });
      }

      return res.status(INTERNAL_ERRORS.INTERNAL_SERVER_ERROR.statusCode).json({
        error: {
          status: INTERNAL_ERRORS.INTERNAL_SERVER_ERROR.status,
          message: INTERNAL_ERRORS.INTERNAL_SERVER_ERROR.message,
        },
      });
    }

    logger.error('Unhandled error:', err);

    return res.status(INTERNAL_ERRORS.INTERNAL_SERVER_ERROR.statusCode).json({
      error: {
        status: INTERNAL_ERRORS.INTERNAL_SERVER_ERROR.status,
        message: INTERNAL_ERRORS.INTERNAL_SERVER_ERROR.message,
      },
    });
  };
}

