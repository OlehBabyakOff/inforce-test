import 'dotenv/config';

import type { Env } from './interfaces/env.interface.js';

import { validator } from '../infrastructure/validator/joi.validator.js';

import { envSchema } from '../schemas/env.schema.js';

export const ENV = (() => {
  const envToValidate = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,

    CACHE: {
      ENTITY_CACHE_TTL: process.env.ENTITY_CACHE_TTL,
      REFRESH_TOKEN_CACHE_TTL: process.env.REFRESH_TOKEN_CACHE_TTL,
      ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
      REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
    },

    JWT: {
      ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
      REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
    },

    MONGODB: {
      URI: process.env.MONGO_URI,
      DB_NAME: process.env.MONGO_DB_NAME,
    },

    REDIS: {
      HOST: process.env.REDIS_HOST,
      PORT: process.env.REDIS_PORT,
      USER: process.env.REDIS_USER,
      PASSWORD: process.env.REDIS_PASSWORD,
      KEY_PREFIX: process.env.REDIS_KEY_PREFIX,
      MAX_RETRIES_PER_REQUEST: process.env.REDIS_MAX_RETRIES_PER_REQUEST,
      ENABLE_OFFLINE_QUEUE: process.env.REDIS_ENABLE_OFFLINE_QUEUE,
      CONNECT_TIMEOUT: process.env.REDIS_CONNECT_TIMEOUT,
      COMMAND_TIMEOUT: process.env.REDIS_COMMAND_TIMEOUT,
    },
  };

  try {
    const validatedEnv: Env = validator.validateEnv(envSchema, envToValidate);

    return {
      NODE_ENV: validatedEnv.NODE_ENV,
      PORT: validatedEnv.PORT,
      CACHE: validatedEnv.CACHE,
      JWT: validatedEnv.JWT,
      MONGODB: validatedEnv.MONGODB,
      REDIS: validatedEnv.REDIS,
    };
  } catch (error: any) {
    console.error(error);

    process.exit(1);
  }
})();

