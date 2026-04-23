import { startApp } from './app.js';

import { logger } from './infrastructure/logger/pino.js';

import { ENV } from './config/env.js';

async function main() {
  try {
    const app = await startApp();

    const server = app.listen(ENV.PORT, () => {
      logger.info(`Server is running on port ${ENV.PORT.toString()}`);
    });

    const shutdown = (signal: string): void => {
      logger.info(`Received ${signal}, shutting down`);

      server.close();

      process.exit(0);
    };

    process.on('SIGINT', () => {
      shutdown('SIGINT');
    });
    process.on('SIGTERM', () => {
      shutdown('SIGTERM');
    });

    process.on('uncaughtException', (err) => {
      logger.fatal('Uncaught Exception', err);

      process.exit(1);
    });

    process.on('unhandledRejection', (err) => {
      logger.fatal('Unhandled Rejection', err as Error);

      process.exit(1);
    });
  } catch (error) {
    logger.fatal('Failed to start server', error as Error);

    process.exit(1);
  }
}

await main();

