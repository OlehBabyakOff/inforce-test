import crypto from 'crypto';

import type { Request, Response, NextFunction } from 'express';

export function requestId() {
  return (req: Request, res: Response, next: NextFunction) => {
    req.id = crypto.randomUUID();

    res.setHeader('x-request-id', req.id);

    next();
  };
}

