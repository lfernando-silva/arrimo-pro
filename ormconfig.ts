import { DataSource } from 'typeorm';

import { join } from 'path';
import env from './ormenv';

const subscriptionEntitiesPath = join(
  __dirname,
  'dist',
  'src',
  'subscription',
  'entities',
  '/*.{js,ts}',
);

const migrationsPath = join(__dirname, 'dist', 'src', 'migrations', '*.js');

// const migrationsDir = join(__dirname, 'src', 'migrations');

const devDataSource = new DataSource({
  name: 'default',
  type: 'postgres',
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_DBNAME,
  entities: [subscriptionEntitiesPath],
  synchronize: false,
  migrations: [migrationsPath],
});

export default devDataSource;
