import type { Request, Response, NextFunction } from 'express';

import { AuthError } from '../errors/AuthError.js';

export function requireRoleMiddleware(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!roles.includes(req.user.role)) {
      throw AuthError.FORBIDDEN();
    }

    next();
  };
}

