import type { Types } from 'mongoose';

export interface JWTClient {
  signAccessToken(payload: TokenPayload): string;
  signRefreshToken(payload: TokenPayload): string;
  verifyAccessToken(token: string): TokenPayload;
}

export interface TokenPayload {
  userId: Types.ObjectId;
  email: string;
  role: string;
}

