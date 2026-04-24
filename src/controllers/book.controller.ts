import type { Request, Response } from 'express';

import { bookService } from '../services/book.service.js';

import { validator } from '../infrastructure/validator/joi.validator.js';

import {
  createBookSchema,
  findBookSchema,
  findBooksSchema,
  updateBookSchema,
  deleteBookSchema,
} from '../schemas/book.schema.js';

class BookController {
  async createBook(req: Request, res: Response) {
    const RequestDTO = await validator.validateRequest(createBookSchema, req);

    const result = await bookService.createBook(RequestDTO);

    res.status(201).json(result);
  }

  async findBook(req: Request, res: Response) {
    const RequestDTO = await validator.validateRequest(findBookSchema, req);

    const result = await bookService.getBookById(RequestDTO);

    res.status(200).json(result);
  }

  async findBooks(req: Request, res: Response) {
    const RequestDTO = await validator.validateRequest(findBooksSchema, req);

    const result = await bookService.getBooks(RequestDTO);

    res.status(200).json({
      data: result.books,
      total: result.total,
    });
  }

  async updateBook(req: Request, res: Response) {
    const RequestDTO = await validator.validateRequest(updateBookSchema, req);

    const result = await bookService.updateBook(RequestDTO);

    res.status(200).json(result);
  }

  async deleteBook(req: Request, res: Response) {
    const RequestDTO = await validator.validateRequest(deleteBookSchema, req);

    await bookService.deleteBook(RequestDTO);

    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
    });
  }
}

export const bookController = new BookController();

