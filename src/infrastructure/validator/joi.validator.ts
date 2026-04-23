import type { Request } from 'express';
import type { Schema, ValidationResult } from 'joi';

import { ValidationError } from '../../errors/ValidationError.js';

class Validator {
  async validateRequest(schema: Schema, req: Request): Promise<ValidationResult['value']> {
    if (!schema) {
      throw ValidationError.INVALID_PARAMS('Invalid validation schema');
    }

    const { body, params, query } = req;

    const data = {
      ...body,
      ...params,
      ...query,
    };

    try {
      const DTO = await schema.validateAsync(data, {
        errors: { wrap: { label: '' } },
        convert: true,
        stripUnknown: true,
      });

      return DTO;
    } catch (error) {
      throw ValidationError.INVALID_PARAMS((error as Error).message);
    }
  }

  validateEnv(schema: Schema, env: object): ValidationResult['value'] {
    if (!schema) {
      throw ValidationError.INVALID_PARAMS('Invalid validation schema');
    }

    const { value, error } = schema.validate(env, {
      convert: true,
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      throw ValidationError.INVALID_ENV(error.message);
    }

    return value;
  }
}

export const validator = new Validator();

