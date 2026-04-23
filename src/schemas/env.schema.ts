import Joi from 'joi';

export const envSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('development', 'production').default('development'),
    PORT: Joi.number().port().default(3000),

    REDIS: Joi.object()
      .keys({
        HOST: Joi.string().hostname().default('localhost'),
        PORT: Joi.number().port().default(6379),
        USER: Joi.string().allow('').default(''),
        PASSWORD: Joi.string().allow('').default(''),
        KEY_PREFIX: Joi.string().default('api:'),
        MAX_RETRIES_PER_REQUEST: Joi.number().integer().min(0).default(2),
        ENABLE_OFFLINE_QUEUE: Joi.boolean().default(true),
        CONNECT_TIMEOUT: Joi.number().integer().min(100).default(5000),
        COMMAND_TIMEOUT: Joi.number().integer().min(100).default(3000),
      })
      .required(),
  })
  .required();

