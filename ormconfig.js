/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require('path');
const env = require('./ormenv');

const migrationsPath = join(__dirname, 'dist', 'migrations', '*.js');

const migrationsDir = join(__dirname, 'src', 'migrations');

module.exports = {
  name: 'default',
  type: 'postgres',
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_DBNAME,
  synchronize: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [migrationsPath],
  cli: {
    migrationsDir,
  },
};
