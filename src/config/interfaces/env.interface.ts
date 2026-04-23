export interface Env {
  NODE_ENV: 'development' | 'production';
  PORT: number;

  MONGODB: {
    URI: string;
    DB_NAME: string;
  };

  REDIS: {
    HOST: string;
    PORT: number;
    USER: string;
    PASSWORD: string;
    KEY_PREFIX: string;
    MAX_RETRIES_PER_REQUEST: number;
    ENABLE_OFFLINE_QUEUE: boolean;
    CONNECT_TIMEOUT: number;
    COMMAND_TIMEOUT: number;
  };
}

