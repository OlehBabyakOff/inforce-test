import type { User, UserRole } from '../models/interfaces/user.interface.js';

import { cacheService } from './cache.service.js';

import { userRepository } from '../repositories/user.repository.js';

import { authHelper } from '../utils/auth.helper.js';

import { AppError } from '../errors/AppError.js';

import { ENV } from '../config/env.js';

class UserService {
  async createUser({
    name,
    email,
    password,
    role,
  }: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
  }): Promise<User> {
    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
      throw AppError.BAD_REQUEST('Email already in use');
    }

    const hashPassword = await authHelper.hashPassword(password);

    const user = await userRepository.create({ name, email, password: hashPassword, role });

    await cacheService.invalidate(`${cacheService.buildCacheKey('users')}*`);

    return user;
  }

  async getUserById({ id }: { id: string }): Promise<User> {
    const cachedUser = await cacheService.get<User>(cacheService.buildCacheKey('user', { id }));

    if (cachedUser) {
      return cachedUser;
    }

    const user = await userRepository.findById(id);

    await cacheService.set(
      cacheService.buildCacheKey('user', { id }),
      user,
      ENV.CACHE.ENTITY_CACHE_TTL,
    );

    return user;
  }

  async getUsers({
    page = 1,
    limit = 10,
  }: {
    page?: number;
    limit?: number;
  }): Promise<{ users: User[]; total: number }> {
    const cachedUsers = await cacheService.get<{ users: User[]; total: number }>(
      cacheService.buildCacheKey('users', { page, limit }),
    );

    if (cachedUsers) {
      return cachedUsers;
    }

    const { users, total } = await userRepository.findAll(page, limit);

    await cacheService.set(
      cacheService.buildCacheKey('users', { page, limit }),
      { users, total },
      ENV.CACHE.ENTITY_CACHE_TTL,
    );

    return { users, total };
  }

  async updateUser({
    id,
    name,
    email,
    password,
    role,
  }: {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
  }): Promise<User> {
    if (email) {
      const existingUser = await userRepository.findByEmail(email);

      if (existingUser && existingUser._id.toString() !== id) {
        throw AppError.BAD_REQUEST('Email already in use');
      }
    }

    const hashPassword = password ? await authHelper.hashPassword(password) : password;

    const user = await userRepository.update(id, { name, email, password: hashPassword, role });

    await Promise.all([
      cacheService.invalidate(cacheService.buildCacheKey('user', { id })),
      cacheService.invalidate(`${cacheService.buildCacheKey('users')}*`),
    ]);

    return user;
  }

  async deleteUser({ id }: { id: string }): Promise<void> {
    await userRepository.delete(id);

    await Promise.all([
      cacheService.invalidate(cacheService.buildCacheKey('user', { id })),
      cacheService.invalidate(`${cacheService.buildCacheKey('users')}*`),
    ]);
  }
}

export const userService = new UserService();

