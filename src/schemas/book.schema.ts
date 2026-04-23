import Joi from 'joi';

import { objectId, paginationSchema } from './shared.schema.js';

import { SCHEMA_ERRORS } from '../constants/schemaErrors.js';

export const findBooksSchema = paginationSchema.messages(SCHEMA_ERRORS);

export const findBookSchema = Joi.object({
  id: objectId.required(),
}).messages(SCHEMA_ERRORS);

export const createBookSchema = Joi.object({
  name: Joi.string().trim().min(1).max(200).required(),
  author: Joi.string().trim().min(1).max(100).required(),
  pageCount: Joi.number().integer().min(1).max(10000).required(),
}).messages(SCHEMA_ERRORS);

export const updateBookSchema = Joi.object({
  id: objectId.required(),
  name: Joi.string().trim().min(1).max(200),
  author: Joi.string().trim().min(1).max(100),
  pageCount: Joi.number().integer().min(1).max(10000),
})
  .min(1)
  .messages(SCHEMA_ERRORS);

export const deleteBookSchema = Joi.object({
  id: objectId.required(),
}).messages(SCHEMA_ERRORS);

