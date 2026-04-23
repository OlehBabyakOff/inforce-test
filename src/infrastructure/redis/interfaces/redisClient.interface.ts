import type { Redis } from 'ioredis';

export interface RedisClient {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getClient(): Redis;
}

