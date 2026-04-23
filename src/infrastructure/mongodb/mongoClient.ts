import mongoose from 'mongoose';

import type { MongoClient as IMongoClient } from './interfaces/mongoClient.interface.js';

import { logger } from '../logger/pino.js';
import { ENV } from '../../config/env.js';

class MongoClient implements IMongoClient {
  async connect(): Promise<void> {
    try {
      await mongoose.connect(ENV.MONGODB.URI, {
        dbName: ENV.MONGODB.DB_NAME,

        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });

      logger.info('MongoDB connected');

      mongoose.connection.on('connected', () => {
        logger.info('MongoDB connected');
      });

      mongoose.connection.on('error', (err) => {
        logger.error('MongoDB error', err as Error);
      });

      mongoose.connection.on('disconnected', () => {
        logger.warn('MongoDB disconnected');
      });

      mongoose.connection.on('reconnected', () => {
        logger.info('MongoDB reconnected');
      });
    } catch (error) {
      logger.error('MongoDB connection error', error as Error);

      throw error;
    }
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();

    logger.info('MongoDB disconnected');
  }
}

export const mongoClient = new MongoClient();

