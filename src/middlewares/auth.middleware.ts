import type { NextFunction, Request, Response } from 'express';

import { jwtClient } from '../infrastructure/jwt/jwtClient.js';

import { AuthError } from '../errors/AuthError.js';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw AuthError.UNAUTHORIZED('Authorization header is missing');
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw AuthError.UNAUTHORIZED('Invalid authorization header format');
    }

    const token = authHeader.substring(7);

    if (!token) {
      throw AuthError.UNAUTHORIZED('Token is missing');
    }

    const payload = jwtClient.verifyAccessToken(token);

    req.user = payload;

    next();
  } catch (error) {
    next(error);
  }
}

