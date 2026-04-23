import type { Request, Response, NextFunction } from 'express';

import { logger } from '../infrastructure/logger/pino.js';

export function requestLogger() {
  return (req: Request, res: Response, next: NextFunction) => {
    const start = process.hrtime.bigint();

    const childLogger = logger.child({ requestId: req.id });

    res.on('finish', () => {
      const end = process.hrtime.bigint();
      const durationMs = Number(end - start) / 1000000;

      const meta = {
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        durationMs: durationMs.toFixed(2),
      };

      childLogger.info('HTTP Request', meta);
    });

    next();
  };
}

