import type { Book } from '../models/interfaces/book.interface.js';

import type {
  CreateBook,
  UpdateBook,
  BookRepository as IBookRepository,
} from './interfaces/bookRepository.interface.js';

import { bookModel } from '../models/book.model.js';

import { AppError } from '../errors/AppError.js';

class BookRepository implements IBookRepository {
  async create(data: CreateBook): Promise<Book> {
    const book = await bookModel.create(data);

    return book;
  }

  async update(id: string, data: UpdateBook): Promise<Book | null> {
    const book = await bookModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      throw AppError.NOT_FOUND('Book not found');
    }

    return book;
  }

  async delete(id: string): Promise<boolean> {
    const result = await bookModel.findByIdAndDelete(id);

    if (!result) {
      throw AppError.NOT_FOUND('Book not found');
    }

    return true;
  }

  async findById(id: string): Promise<Book | null> {
    const book = await bookModel.findById(id);

    if (!book) {
      throw AppError.NOT_FOUND('Book not found');
    }

    return book;
  }

  async findAll(page: number = 1, limit: number = 10): Promise<Book[]> {
    const skip = (page - 1) * limit;

    const books: Book[] = await bookModel.aggregate([
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          _id: 1,
          name: 1,
          author: 1,
          pageCount: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

    return books;
  }
}

export const bookRepository = new BookRepository();

