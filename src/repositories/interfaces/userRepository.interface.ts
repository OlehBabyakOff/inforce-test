import type { User } from '../../models/interfaces/user.interface.js';
import type { UserRole } from '../../models/interfaces/user.interface.js';

export interface CreateUser {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface UpdateUser {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
}

export interface UserRepository {
  create(data: CreateUser): Promise<User>;
  findById(id: string): Promise<User | null>;
  findAll(page: number, limit: number): Promise<{ users: User[]; total: number }>;
  update(id: string, data: UpdateUser): Promise<User | null>;
  delete(id: string): Promise<boolean>;
}

