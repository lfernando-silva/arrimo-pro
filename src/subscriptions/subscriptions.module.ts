import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Subscription } from './entities';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionRepository } from './repositories';
import { Country } from '../countries/entities';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Country, Subscription, SubscriptionRepository]),
  ],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, SubscriptionRepository, JwtStrategy],
})
export class SubscriptionModule {}
