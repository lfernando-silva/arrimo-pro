import { Injectable, NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionRepository } from './repositories';
import { CountryRepository } from '../countries/repositories';

@Injectable()
export class SubscriptionsService {
  private subscriptionsRepository: SubscriptionRepository;
  private countriesRepository: CountryRepository;
  constructor(private readonly connection: Connection) {
    this.subscriptionsRepository = this.connection.getCustomRepository(
      SubscriptionRepository,
    );
    this.countriesRepository =
      this.connection.getCustomRepository(CountryRepository);
  }

  async create(data: CreateSubscriptionDto) {
    const country = await this.countriesRepository.findOne({
      id: data.countryId,
    });

    if (!country) {
      throw new NotFoundException('Country was not found');
    }

    const subscription = this.subscriptionsRepository.create({
      ...data,
      country,
    });

    await this.subscriptionsRepository.save(subscription, { reload: true });
    return subscription;
  }
}
