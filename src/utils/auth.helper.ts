import crypto from 'crypto';

class AuthHelper {
  async hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const salt = crypto.randomBytes(16).toString('hex');

      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) {
          reject(err);
        }

        resolve(`${salt}:${derivedKey.toString('hex')}`);
      });
    });
  }

  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const [salt, hash] = hashedPassword.split(':');

      const hashBuffer = Buffer.from(hash, 'hex');

      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) {
          reject(err);
        }

        resolve(crypto.timingSafeEqual(hashBuffer, derivedKey));
      });
    });
  }
}

export const authHelper = new AuthHelper();

