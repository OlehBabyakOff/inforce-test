import { Router } from 'express';

import { bookController } from '../controllers/book.controller.js';

export const booksRouter = Router();

booksRouter.get('/', bookController.findBooks);
booksRouter.get('/:id', bookController.findBook);

booksRouter.post('/', bookController.createBook);

booksRouter.put('/:id', bookController.updateBook);

booksRouter.delete('/:id', bookController.deleteBook);

