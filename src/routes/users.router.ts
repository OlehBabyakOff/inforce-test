import { Router } from 'express';

import { userController } from '../controllers/user.controller.js';

export const usersRouter = Router();

usersRouter.get('/', userController.findUsers);
usersRouter.get('/:id', userController.findUser);

usersRouter.post('/', userController.createUser);

usersRouter.put('/:id', userController.updateUser);

usersRouter.delete('/:id', userController.deleteUser);

