import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

import config from '../../../config';
import { Country } from '../../entities';
import { CountriesController } from '../../countries.controller';
import { CountriesService } from '../../countries.service';
import { CountryRepository } from '../../repositories';

const envFilePath = path.join(
  process.cwd(),
  `.env.${process.env.NODE_ENV || 'development'}`,
);

export default function createTestingModule() {
  return Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        load: [config],
        envFilePath,
      }),
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DBNAME,
        entities: [Country],
      }),
      TypeOrmModule.forFeature([Country, CountryRepository]),
    ],
    controllers: [CountriesController],
    providers: [CountriesService, Country, CountryRepository],
  }).compile();
}
