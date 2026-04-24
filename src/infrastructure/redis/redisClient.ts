import { Redis } from 'ioredis';
import type { Redis as RedisType } from 'ioredis';

import type { RedisClient as IRedisClient } from './interfaces/redisClient.interface.js';

import { logger } from '../logger/pino.js';

import { ENV } from '../../config/env.js';

class RedisClient implements IRedisClient {
  private client: RedisType;

  constructor() {
    this.client = new Redis(ENV.REDIS.URL, {
      lazyConnect: true,
      keyPrefix: ENV.REDIS.KEY_PREFIX,

      maxRetriesPerRequest: ENV.REDIS.MAX_RETRIES_PER_REQUEST,
      enableOfflineQueue: ENV.REDIS.ENABLE_OFFLINE_QUEUE,
      connectTimeout: ENV.REDIS.CONNECT_TIMEOUT,
      commandTimeout: ENV.REDIS.COMMAND_TIMEOUT,

      retryStrategy: (times) => {
        if (times > 10) {
          return null;
        }

        return Math.min(times * 100, 2000);
      },

      reconnectOnError: (error) => {
        const targetErrors = ['READONLY', 'ETIMEDOUT', 'ECONNRESET'];

        return targetErrors.some((err) => error.message.includes(err));
      },
    });

    this.client.on('error', (err) => {
      logger.error('Redis error', err);
    });
    this.client.on('close', () => {
      logger.warn('Redis connection closed');
    });
    this.client.on('reconnecting', () => {
      logger.warn('Redis reconnecting');
    });
  }

  async connect(): Promise<void> {
    if (this.client.status !== 'ready') {
      await this.client.connect();

      logger.info(
        `Redis client connected on: ${this.client.options.host}:${this.client.options.port}`,
      );
    }
  }

  async disconnect(): Promise<void> {
    await this.client.quit();

    logger.info('Redis client disconnected');
  }

  getClient(): RedisType {
    return this.client;
  }
}

export const redisClient = new RedisClient();

