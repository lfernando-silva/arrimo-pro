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
import { AuthService } from '../../auth/auth.service';
import { AuthController } from '../../auth/auth.controller';
import { User } from '../../auth/entities';
import { UserRepository } from '../../auth/repositories';
import { JwtStrategy } from '../../auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

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
        entities: [Country, Subscription, User],
      }),
      TypeOrmModule.forFeature([
        Subscription,
        SubscriptionRepository,
        Country,
        CountryRepository,
        User,
        UserRepository,
      ]),
      JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: 20000,
        },
      }),
      PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    controllers: [AuthController, SubscriptionsController, CountriesController],
    providers: [
      JwtStrategy,
      User,
      UserRepository,
      AuthService,
      SubscriptionsService,
      Subscription,
      SubscriptionRepository,
      CountriesService,
      Country,
      CountryRepository,
    ],
    exports: [PassportModule],
  }).compile();
}
