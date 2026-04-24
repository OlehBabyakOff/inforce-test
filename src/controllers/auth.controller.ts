import type { Request, Response } from 'express';

import { authService } from '../services/auth.service.js';

import { validator } from '../infrastructure/validator/joi.validator.js';

import { loginSchema, signupSchema } from '../schemas/auth.schema.js';

class AuthController {
  async login(req: Request, res: Response) {
    const RequestDTO = await validator.validateRequest(loginSchema, req);

    const result = await authService.login(RequestDTO);

    res.status(200).json({
      user: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
  }

  async signup(req: Request, res: Response) {
    const RequestDTO = await validator.validateRequest(signupSchema, req);

    const result = await authService.signup(RequestDTO);

    res.status(201).json({
      user: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
  }
}

export const authController = new AuthController();

