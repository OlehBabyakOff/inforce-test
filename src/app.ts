import express from 'express';
import helmet from 'helmet';
import compression from 'compression';

import { requestId } from './middlewares/reqId.middleware.js';
import { requestLogger } from './middlewares/requestLogger.middleware.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';
import { notFound } from './middlewares/notFound.middleware.js';

import { router } from './routes/index.js';

export async function startApp() {
  const app = express();

  app.use(requestId());

  app.use(helmet());

  app.use(express.json());

  app.use(compression({ threshold: 1024 }));

  app.use(requestLogger());

  app.use('/api', router);

  app.use(notFound());

  app.use(errorHandler());

  return app;
}

