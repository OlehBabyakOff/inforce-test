import Joi from 'joi';

import { SCHEMA_ERRORS } from '../constants/schemaErrors.js';

export const signupSchema = Joi.object()
  .keys({
    name: Joi.string().trim().min(2).max(50).required(),
    email: Joi.string().email().trim().lowercase().required(),
    password: Joi.string().min(6).max(100).required(),
  })
  .messages(SCHEMA_ERRORS);

export const loginSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().min(6).required(),
}).messages(SCHEMA_ERRORS);

