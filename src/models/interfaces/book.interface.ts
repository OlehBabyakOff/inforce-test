import type { Document } from 'mongoose';

export interface Book extends Document {
  name: string;
  author: string;
  pageCount: number;
  createdAt: Date;
  updatedAt: Date;
}

