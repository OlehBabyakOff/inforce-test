import type { SignOptions } from 'jsonwebtoken';

import jwt from 'jsonwebtoken';

import type { JWTClient as IJwtClient, TokenPayload } from './interfaces/jwtClient.interface.js';

import { AuthError } from '../../errors/AuthError.js';

import { ENV } from '../../config/env.js';

class JwtClient implements IJwtClient {
  signTokens(payload: TokenPayload): { accessToken: string; refreshToken: string } {
    const accessToken = this.signAccessToken(payload);
    const refreshToken = this.signRefreshToken(payload);

    return { accessToken, refreshToken };
  }

  signAccessToken(payload: TokenPayload): string {
    return this.signToken(payload, ENV.JWT.ACCESS_TOKEN_SECRET, ENV.CACHE.ACCESS_TOKEN_EXPIRY);
  }

  signRefreshToken(payload: TokenPayload): string {
    return this.signToken(payload, ENV.JWT.REFRESH_TOKEN_SECRET, ENV.CACHE.REFRESH_TOKEN_EXPIRY);
  }

  verifyAccessToken(token: string): TokenPayload {
    try {
      const payload = jwt.verify(token, ENV.JWT.ACCESS_TOKEN_SECRET) as TokenPayload;

      return payload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw AuthError.TOKEN_EXPIRED();
      }

      if (error instanceof jwt.JsonWebTokenError) {
        throw AuthError.INVALID_TOKEN();
      }

      throw error;
    }
  }

  private signToken(
    payload: TokenPayload,
    secret: string,
    expiresIn: SignOptions['expiresIn'],
  ): string {
    return jwt.sign(payload, secret, { expiresIn });
  }
}

export const jwtClient = new JwtClient();

