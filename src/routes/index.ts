import { Router } from 'express';

import { authMiddleware } from '../middlewares/auth.middleware.js';

import { authRouter } from './auth.router.js';
import { usersRouter } from './users.router.js';
import { booksRouter } from './books.router.js';

export const router = Router();

router.get('/health', (_, res) => {
  res.status(200).json({ status: 'ok' });
});

router.use('/', authRouter);

router.use(authMiddleware);

router.use('/users', usersRouter);
router.use('/books', booksRouter);

