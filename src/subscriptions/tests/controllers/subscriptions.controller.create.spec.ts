import { BadRequestException, NotFoundException } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { getRepository } from 'typeorm';

import { SubscriptionsController } from '../../subscriptions.controller';
import truncate from '../../../helpers/tests/truncate';
import createTestingModule from '../../../helpers/tests/create-testing-module';
import { generateSubscription } from '../../../helpers/tests/generate-data';
import { Country } from '../../../countries/entities';

describe('SubscriptionsController', () => {
  let moduleRef: TestingModule;
  let subscriptionsController: SubscriptionsController;

  beforeAll(async () => {
    moduleRef = await createTestingModule();

    subscriptionsController = moduleRef.get<SubscriptionsController>(
      SubscriptionsController,
    );
  });

  afterAll(() => {
    moduleRef.close();
  });

  describe('Create Subscription', () => {
    let mockCreateSubscriptionDto;

    beforeEach(async () => {
      await truncate();
      const country = await getRepository(Country).findOne();
      mockCreateSubscriptionDto = generateSubscription(country);
    });

    it('should create a new subscription', async () => {
      const response = await subscriptionsController.create(
        mockCreateSubscriptionDto,
      );
      expect(response).toEqual({
        id: expect.any(String),
        subscriberName: mockCreateSubscriptionDto.subscriberName,
        frequency: mockCreateSubscriptionDto.frequency,
        isEmailVerified: false,
        email: mockCreateSubscriptionDto.email,
        subscriptionTime: expect.any(Date),
        country: expect.objectContaining({
          id: mockCreateSubscriptionDto.countryId,
        }),
      });
    });

    it('should throw an error if country does not exist', async () => {
      mockCreateSubscriptionDto.countryId = faker.datatype.uuid();
      expect(
        subscriptionsController.create(mockCreateSubscriptionDto),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw an error if sent data is not valid', async () => {
      mockCreateSubscriptionDto.email = faker.random.words(351);
      expect(
        subscriptionsController.create(mockCreateSubscriptionDto),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
