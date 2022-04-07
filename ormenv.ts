/* eslint-disable @typescript-eslint/no-var-requires */
import * as dotenv from 'dotenv';

const env: any = dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

export default env.parsed;
