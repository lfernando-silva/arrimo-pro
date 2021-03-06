import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { CountriesModule } from './countries/countries.module';
import { SubscriptionModule } from './subscriptions/subscriptions.module';
import { AuthModule } from './auth/auth.module';

const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      envFilePath,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('DATABASE_HOST'),
          port: parseInt(configService.get<string>('DATABASE_PORT')),
          username: configService.get<string>('DATABASE_USERNAME'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_DBNAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    CountriesModule,
    SubscriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
