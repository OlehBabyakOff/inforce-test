declare global {
  namespace Express {
    interface Request {
      id: string;
      user: {
        userId: Types.ObjectId;
        email: string;
        role: string;
      };
    }
  }
}

export {};

