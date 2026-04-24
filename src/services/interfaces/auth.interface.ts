import type { User } from '../../models/interfaces/user.interface.js';

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

