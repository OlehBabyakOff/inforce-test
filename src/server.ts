import { startApp } from './app.js';

import { logger } from './infrastructure/logger/pino.js';
import { mongoClient } from './infrastructure/mongodb/mongoClient.js';
import { redisClient } from './infrastructure/redis/redisClient.js';

import { ENV } from './config/env.js';

async function main() {
  try {
    await mongoClient.connect();
    await redisClient.connect();

    const app = await startApp();

    const server = app.listen(ENV.PORT, () => {
      logger.info(`Server is running on port ${ENV.PORT.toString()}`);
    });

    const shutdown = async (signal: string, exitCode: number = 0): Promise<void> => {
      logger.info(`Received ${signal}, shutting down`);

      await new Promise<void>((resolve) => {
        server.close(() => {
          resolve();
        });
      });

      await redisClient.disconnect();
      await mongoClient.disconnect();

      process.exit(exitCode);
    };

    process.on('SIGINT', () => {
      shutdown('SIGINT').catch((err: unknown) => {
        logger.error('Shutdown error', err as Error);

        process.exit(1);
      });
    });

    process.on('SIGTERM', () => {
      shutdown('SIGTERM').catch((err: unknown) => {
        logger.error('Shutdown error', err as Error);

        process.exit(1);
      });
    });

    process.on('uncaughtException', (err) => {
      logger.fatal('Uncaught Exception', err);

      shutdown('uncaughtException', 1).catch((error: unknown) => {
        logger.error('Shutdown error', error as Error);

        process.exit(1);
      });
    });

    process.on('unhandledRejection', (err) => {
      logger.fatal('Unhandled Rejection', err as Error);

      shutdown('unhandledRejection', 1).catch((error: unknown) => {
        logger.error('Shutdown error', error as Error);

        process.exit(1);
      });
    });
  } catch (error) {
    logger.fatal('Failed to start server', error as Error);

    await redisClient.disconnect();
    await mongoClient.disconnect();

    process.exit(1);
  }
}

await main();

