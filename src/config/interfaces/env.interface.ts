import type { SignOptions } from 'jsonwebtoken';

export interface Env {
  NODE_ENV: 'development' | 'production';
  PORT: number;

  CACHE: {
    ENTITY_CACHE_TTL: number;
    REFRESH_TOKEN_CACHE_TTL: number;
    ACCESS_TOKEN_EXPIRY: SignOptions['expiresIn'];
    REFRESH_TOKEN_EXPIRY: SignOptions['expiresIn'];
  };

  JWT: {
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
  };

  MONGODB: {
    URI: string;
    DB_NAME: string;
  };

  REDIS: {
    HOST: string;
    PORT: number;
    USER: string;
    PASSWORD: string;
    KEY_PREFIX: string;
    MAX_RETRIES_PER_REQUEST: number;
    ENABLE_OFFLINE_QUEUE: boolean;
    CONNECT_TIMEOUT: number;
    COMMAND_TIMEOUT: number;
  };
}

