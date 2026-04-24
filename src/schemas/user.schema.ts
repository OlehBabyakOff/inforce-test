import Joi from 'joi';

import { objectId, paginationSchema } from './shared.schema.js';

import { SCHEMA_ERRORS } from '../constants/schemaErrors.js';
import { UserRole } from '../models/interfaces/user.interface.js';

export const findUsersSchema = paginationSchema.messages(SCHEMA_ERRORS);

export const findUserSchema = Joi.object({
  id: objectId.required(),
}).messages(SCHEMA_ERRORS);

export const createUserSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required(),
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string()
    .valid(...Object.values(UserRole))
    .default(UserRole.USER),
}).messages(SCHEMA_ERRORS);

export const updateUserSchema = Joi.object({
  id: objectId.required(),
  name: Joi.string().trim().min(2).max(50),
  email: Joi.string().email().trim().lowercase(),
  password: Joi.string().min(6),
  role: Joi.string().valid(...Object.values(UserRole)),
})
  .min(1)
  .messages(SCHEMA_ERRORS);

export const deleteUserSchema = Joi.object({
  id: objectId.required(),
}).messages(SCHEMA_ERRORS);

