import type { Book } from '../../models/interfaces/book.interface.js';

export interface CreateBook {
  name: string;
  author: string;
  pageCount: number;
}

export interface UpdateBook {
  name?: string;
  author?: string;
  pageCount?: number;
}

export interface BookRepository {
  create(data: CreateBook): Promise<Book>;
  findById(id: string): Promise<Book | null>;
  findAll(): Promise<Book[]>;
  update(id: string, data: UpdateBook): Promise<Book | null>;
  delete(id: string): Promise<boolean>;
}

