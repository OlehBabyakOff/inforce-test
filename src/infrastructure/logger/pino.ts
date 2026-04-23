import pino from 'pino';
import type { Logger as LoggerInstance } from 'pino';

import type { Logger } from './interfaces/logger.interface.js';

import { createPinoConfig } from './config.js';

import { ENV } from '../../config/env.js';

import { CONSTANTS } from '../../constants/index.js';

import { LOGGER_CONSTANTS } from './constants.js';

export class PinoLogger implements Logger {
  private logger: LoggerInstance;

  constructor() {
    this.logger = pino(
      createPinoConfig({
        level:
          ENV.NODE_ENV === CONSTANTS.ENVIRONMENTS.DEVELOPMENT
            ? LOGGER_CONSTANTS.LOG_LEVELS.DEBUG
            : LOGGER_CONSTANTS.LOG_LEVELS.INFO,
        env: ENV.NODE_ENV,
        pretty: ENV.NODE_ENV === CONSTANTS.ENVIRONMENTS.DEVELOPMENT,
      }),
    );
  }

  info(message: string, meta?: Record<string, unknown>): void {
    this.logger.info(meta, message);
  }
  debug(message: string, meta?: Record<string, unknown>): void {
    this.logger.debug(meta, message);
  }
  warn(message: string, meta?: Record<string, unknown>): void {
    this.logger.warn(meta, message);
  }
  trace(message: string, meta?: Record<string, unknown>): void {
    this.logger.trace(meta, message);
  }
  error(message: string, error?: Error, meta?: Record<string, unknown>): void {
    this.logger.error(error ? { err: error, ...meta } : meta, message);
  }
  fatal(message: string, error?: Error, meta?: Record<string, unknown>): void {
    this.logger.fatal(error ? { err: error, ...meta } : meta, message);
  }
  child(meta: Record<string, unknown>): Logger {
    const child = new PinoLogger();

    child.logger = this.logger.child(meta);

    return child;
  }
}

export const logger = new PinoLogger();

