import { Schema, model } from 'mongoose';

import type { Book } from './interfaces/book.interface.js';

const bookSchema = new Schema<Book>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 200,
    },
    author: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 100,
    },
    pageCount: {
      type: Number,
      required: true,
      min: 1,
      max: 10000,
    },
  },
  {
    timestamps: true,
  },
);

export const bookModel = model<Book>('Book', bookSchema);

