import Joi from 'joi';

export const envSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('development', 'production').default('development'),
    PORT: Joi.number().port().default(3000),

    CACHE: Joi.object().keys({
      ENTITY_CACHE_TTL: Joi.number()
        .integer()
        .min(1)
        .default(60 * 60),
      REFRESH_TOKEN_CACHE_TTL: Joi.number()
        .integer()
        .min(1)
        .default(60 * 60 * 24 * 7),
      ACCESS_TOKEN_EXPIRY: Joi.string().default('15m'),
      REFRESH_TOKEN_EXPIRY: Joi.string().default('7d'),
    }),

    JWT: Joi.object()
      .keys({
        ACCESS_TOKEN_SECRET: Joi.string().required(),
        REFRESH_TOKEN_SECRET: Joi.string().required(),
      })
      .required(),

    MONGODB: Joi.object()
      .keys({
        URI: Joi.string().uri().required(),
        DB_NAME: Joi.string().required(),
      })
      .required(),

    REDIS: Joi.object()
      .keys({
        URL: Joi.string().uri().required(),
        KEY_PREFIX: Joi.string().default('api:'),
        MAX_RETRIES_PER_REQUEST: Joi.number().integer().min(0).default(2),
        ENABLE_OFFLINE_QUEUE: Joi.boolean().default(true),
        CONNECT_TIMEOUT: Joi.number().integer().min(100).default(5000),
        COMMAND_TIMEOUT: Joi.number().integer().min(100).default(3000),
      })
      .required(),
  })
  .required();

