import type { Request, Response } from 'express';

import { userService } from '../services/user.service.js';

import { validator } from '../infrastructure/validator/joi.validator.js';

import {
  createUserSchema,
  findUserSchema,
  findUsersSchema,
  updateUserSchema,
  deleteUserSchema,
} from '../schemas/user.schema.js';

class UserController {
  async createUser(req: Request, res: Response) {
    const RequestDTO = await validator.validateRequest(createUserSchema, req);

    const result = await userService.createUser(RequestDTO);

    res.status(201).json(result);
  }

  async findUser(req: Request, res: Response) {
    const RequestDTO = await validator.validateRequest(findUserSchema, req);

    const result = await userService.getUserById(RequestDTO);

    res.status(200).json(result);
  }

  async findUsers(req: Request, res: Response) {
    const RequestDTO = await validator.validateRequest(findUsersSchema, req);

    const result = await userService.getUsers(RequestDTO);

    res.status(200).json({
      data: result.users,
      total: result.total,
    });
  }

  async updateUser(req: Request, res: Response) {
    const RequestDTO = await validator.validateRequest(updateUserSchema, req);

    const result = await userService.updateUser(RequestDTO);

    res.status(200).json(result);
  }

  async deleteUser(req: Request, res: Response) {
    const RequestDTO = await validator.validateRequest(deleteUserSchema, req);

    await userService.deleteUser(RequestDTO);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  }
}

export const userController = new UserController();

