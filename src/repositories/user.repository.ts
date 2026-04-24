import type { User } from '../models/interfaces/user.interface.js';

import type {
  CreateUser,
  UpdateUser,
  UserRepository as IUserRepository,
} from './interfaces/userRepository.interface.js';

import { userModel } from '../models/user.model.js';

import { AppError } from '../errors/AppError.js';

class UserRepository implements IUserRepository {
  async create(data: CreateUser): Promise<User> {
    const user = await userModel.create(data);

    return user;
  }

  async update(id: string, data: UpdateUser): Promise<User> {
    const user = await userModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      throw AppError.NOT_FOUND('User not found');
    }

    return user;
  }

  async delete(id: string): Promise<boolean> {
    const result = await userModel.findByIdAndDelete(id);

    if (!result) {
      throw AppError.NOT_FOUND('User not found');
    }

    return true;
  }

  async findById(id: string): Promise<User> {
    const user = await userModel.findById(id);

    if (!user) {
      throw AppError.NOT_FOUND('User not found');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await userModel.findOne({ email });

    return user;
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{ users: User[]; total: number }> {
    const skip = (page - 1) * limit;

    const users: User[] = await userModel.aggregate([
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          role: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

    const total = await userModel.countDocuments();

    return { users, total };
  }
}

export const userRepository = new UserRepository();

