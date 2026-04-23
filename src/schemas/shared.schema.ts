import Joi from 'joi';

export const objectId = Joi.string().hex().length(24);

export const paginationSchema = Joi.object().keys({
  page: Joi.number().integer().positive().min(1).default(1),
  limit: Joi.number().integer().positive().min(1).max(100).default(10),
});

