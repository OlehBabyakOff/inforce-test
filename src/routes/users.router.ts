import { Router } from 'express';

import { requireRoleMiddleware } from '../middlewares/role.middleware.js';

import { userController } from '../controllers/user.controller.js';

export const usersRouter = Router();

usersRouter.use(requireRoleMiddleware(['admin']));

usersRouter.get('/', userController.findUsers);
usersRouter.get('/:id', userController.findUser);

usersRouter.post('/', userController.createUser);

usersRouter.put('/:id', userController.updateUser);

usersRouter.delete('/:id', userController.deleteUser);

