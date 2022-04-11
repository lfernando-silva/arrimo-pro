import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Subscription } from './entities';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionRepository } from './repositories';
import { Country } from '../countries/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Country, Subscription, SubscriptionRepository]),
  ],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, SubscriptionRepository],
})
export class SubscriptionModule {}
