import type { AuthResponse } from './interfaces/auth.interface.js';
import type { UserRole } from '../models/interfaces/user.interface.js';

import { jwtClient } from '../infrastructure/jwt/jwtClient.js';

import { cacheService } from './cache.service.js';

import { userRepository } from '../repositories/user.repository.js';

import { authHelper } from '../utils/auth.helper.js';

import { AppError } from '../errors/AppError.js';
import { AuthError } from '../errors/AuthError.js';

import { ENV } from '../config/env.js';

class AuthService {
  async signup({
    name,
    email,
    password,
    role,
  }: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
  }): Promise<AuthResponse> {
    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
      throw AppError.BAD_REQUEST('User with this email already exists');
    }

    const hashedPassword = await authHelper.hashPassword(password);

    const user = await userRepository.create({ name, email, password: hashedPassword, role });

    const { accessToken, refreshToken } = jwtClient.signTokens({
      userId: user._id,
      email: user.email,
      role: user.role,
    });

    await cacheService.set(
      cacheService.buildCacheKey('refreshToken', { userId: user._id }),
      refreshToken,
      ENV.CACHE.REFRESH_TOKEN_CACHE_TTL,
    );

    return { user, accessToken, refreshToken };
  }

  async login({ email, password }: { email: string; password: string }): Promise<AuthResponse> {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw AppError.NOT_FOUND('User not found');
    }

    const isPasswordValid = await authHelper.verifyPassword(password, user.password);

    if (!isPasswordValid) {
      throw AuthError.INVALID_CREDENTIALS();
    }

    const { accessToken, refreshToken } = jwtClient.signTokens({
      userId: user._id,
      email: user.email,
      role: user.role,
    });

    await cacheService.set(
      cacheService.buildCacheKey('refreshToken', { userId: user._id }),
      refreshToken,
      ENV.CACHE.REFRESH_TOKEN_CACHE_TTL,
    );

    return { user, accessToken, refreshToken };
  }
}

export const authService = new AuthService();

