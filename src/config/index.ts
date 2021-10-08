
import * as dotenv from 'dotenv';

dotenv.config();

enum NodeEnv {
  TEST = 'test',
  DEV = 'development',
}

interface Env {
    env: NodeEnv;
    dbName: string;
    dbTestName: string;
    port: number;
  }

  export const config: Env = {
    env: (process.env.NODE_ENV as NodeEnv) || NodeEnv.DEV,
    dbName: process.env.DB_NAME || '',
    dbTestName: process.env.DB_TEST_NAME || '',
    port: process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : 3000,
  };
  