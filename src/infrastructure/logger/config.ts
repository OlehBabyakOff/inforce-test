import os from 'os';
import pino from 'pino';
import type { LoggerOptions } from 'pino';

import type { LoggerConfigOption } from './interfaces/logger-config.interface.js';

export function createPinoConfig(options: LoggerConfigOption): LoggerOptions {
  const isDev = options.pretty ?? false;

  return {
    level: options.level,
    timestamp: pino.stdTimeFunctions.isoTime,
    base: {
      env: options.env,
      hostname: os.hostname(),
    },
    transport: isDev
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            levelFirst: true,
            translateTime: 'yyyy-mm-dd HH:MM:ss o',
          },
        }
      : undefined,
  };
}

