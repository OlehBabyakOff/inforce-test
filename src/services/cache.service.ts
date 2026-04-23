import { redisClient } from '../infrastructure/redis/redisClient.js';

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
    const stream = this.redis.scanStream({ match: pattern, count: 100 }) as AsyncIterable<string[]>;

    for await (const keys of stream) {
      if (keys.length) {
        await this.redis.del(...keys);
      }
    }
  }
}

export const cacheService = new CacheService();

