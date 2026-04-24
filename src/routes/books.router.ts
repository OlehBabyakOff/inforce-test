import { Router } from 'express';

import { requireRoleMiddleware } from '../middlewares/role.middleware.js';

import { bookController } from '../controllers/book.controller.js';

export const booksRouter = Router();

booksRouter.get('/', bookController.findBooks);
booksRouter.get('/:id', bookController.findBook);

booksRouter.use(requireRoleMiddleware(['admin']));

booksRouter.post('/', bookController.createBook);

booksRouter.put('/:id', bookController.updateBook);

booksRouter.delete('/:id', bookController.deleteBook);

