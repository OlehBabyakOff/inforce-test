import { redisClient } from '../infrastructure/redis/redisClient.js';

import { ENV } from '../config/env.js';

class CacheService {
  private redis = redisClient.getClient();

  async set(key: string, value: any, ttl?: number): Promise<void> {
    const data = JSON.stringify(value);

    if (ttl) {
      await this.redis.set(key, data, 'EX', ttl);
    } else {
      await this.redis.set(key, data);
    }
  }

  async get<T>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);

    if (data) {
      return JSON.parse(data) as T;
    }

    return null;
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async invalidate(pattern: string): Promise<void> {
    const fullPattern = `${ENV.REDIS.KEY_PREFIX}${pattern}`;

    const keys: string[] = [];

    let cursor = '0';

    do {
      const result = await this.redis.scan(cursor, 'MATCH', fullPattern, 'COUNT', 100);

      cursor = result[0];

      keys.push(...result[1]);
    } while (cursor !== '0');

    if (keys.length > 0) {
      const cleanKeys = keys.map((key) => key.replace(ENV.REDIS.KEY_PREFIX, ''));

      await this.redis.del(...cleanKeys);
    }
  }

  buildCacheKey(prefix: string, params?: Record<string, unknown>): string {
    if (!params || !Object.keys(params).length) {
      return prefix;
    }

    const serialized = Object.entries(params)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${this.serialize(value)}`)
      .join(':');

    return `${prefix}:${serialized}`;
  }

  private serialize(value: any): string {
    if (value === null || value === undefined) {
      return 'null';
    }

    if (typeof value === 'object') {
      return JSON.stringify(value);
    }

    return String(value);
  }
}

export const cacheService = new CacheService();

