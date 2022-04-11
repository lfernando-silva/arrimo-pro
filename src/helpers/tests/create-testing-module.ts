import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

import config from '../../config';
import { Subscription } from '../../subscriptions/entities';
import { Country } from '../../countries/entities';
import { SubscriptionsController } from '../../subscriptions/subscriptions.controller';
import { CountriesController } from '../../countries/countries.controller';
import { SubscriptionsService } from '../../subscriptions/subscriptions.service';
import { CountriesService } from '../../countries/countries.service';
import { CountryRepository } from '../../countries/repositories';
import { SubscriptionRepository } from '../../subscriptions/repositories';

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
        entities: [Country, Subscription],
      }),
      TypeOrmModule.forFeature([
        Subscription,
        SubscriptionRepository,
        Country,
        CountryRepository,
      ]),
    ],
    controllers: [SubscriptionsController, CountriesController],
    providers: [
      SubscriptionsService,
      Subscription,
      SubscriptionRepository,
      CountriesService,
      Country,
      CountryRepository,
    ],
  }).compile();
}
