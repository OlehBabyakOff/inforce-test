import type { Book } from '../models/interfaces/book.interface.js';

import { cacheService } from './cache.service.js';

import { bookRepository } from '../repositories/book.repository.js';

import { ENV } from '../config/env.js';

class BookService {
  async createBook({
    name,
    author,
    pageCount,
  }: {
    name: string;
    author: string;
    pageCount: number;
  }): Promise<Book> {
    const book = await bookRepository.create({ name, author, pageCount });

    await cacheService.invalidate(`${cacheService.buildCacheKey('books')}*`);

    return book;
  }

  async getBookById({ id }: { id: string }): Promise<Book> {
    const cachedBook = await cacheService.get<Book>(cacheService.buildCacheKey('book', { id }));

    if (cachedBook) {
      return cachedBook;
    }

    const book = await bookRepository.findById(id);

    await cacheService.set(
      cacheService.buildCacheKey('book', { id }),
      book,
      ENV.CACHE.ENTITY_CACHE_TTL,
    );

    return book;
  }

  async getBooks({
    page = 1,
    limit = 10,
  }: {
    page?: number;
    limit?: number;
  }): Promise<{ books: Book[]; total: number }> {
    const cachedBooks = await cacheService.get<{ books: Book[]; total: number }>(
      cacheService.buildCacheKey('books', { page, limit }),
    );

    if (cachedBooks) {
      return cachedBooks;
    }

    const { books, total } = await bookRepository.findAll(page, limit);

    await cacheService.set(
      cacheService.buildCacheKey('books', { page, limit }),
      { books, total },
      ENV.CACHE.ENTITY_CACHE_TTL,
    );

    return { books, total };
  }

  async updateBook({
    id,
    name,
    author,
    pageCount,
  }: {
    id: string;
    name: string;
    author: string;
    pageCount: number;
  }): Promise<Book> {
    const book = await bookRepository.update(id, { name, author, pageCount });

    await Promise.all([
      cacheService.invalidate(cacheService.buildCacheKey('book', { id })),
      cacheService.invalidate(`${cacheService.buildCacheKey('books')}*`),
    ]);

    return book;
  }

  async deleteBook({ id }: { id: string }): Promise<void> {
    await bookRepository.delete(id);

    await Promise.all([
      cacheService.invalidate(cacheService.buildCacheKey('book', { id })),
      cacheService.invalidate(`${cacheService.buildCacheKey('books')}*`),
    ]);
  }
}

export const bookService = new BookService();

