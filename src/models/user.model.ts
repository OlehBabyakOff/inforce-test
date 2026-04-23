import { Schema, model } from 'mongoose';

import type { User } from './interfaces/user.interface.js';
import { UserRole } from './interfaces/user.interface.js';

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    role: {
      type: String,
      enum: Object.values([UserRole.USER, UserRole.ADMIN]),
      default: UserRole.USER,
    },
  },
  {
    timestamps: true,
  },
);

export const userModel = model<User>('User', userSchema);

