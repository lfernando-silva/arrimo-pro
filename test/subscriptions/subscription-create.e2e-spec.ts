import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import * as request from 'supertest';
import { getRepository } from 'typeorm';

import { Country } from '../../src/countries/entities';
import truncate from '../../src/helpers/tests/truncate';
import { generateSubscription } from '../../src/helpers/tests/generate-data';
import { createTestingModule } from '../helpers/init-app';

describe('GamesController - Create(e2e)', () => {
  let app: INestApplication;
  let moduleRef: TestingModule;
  let mockCreateSubscriptionDto;

  beforeAll(async () => {
    moduleRef = await createTestingModule();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await truncate();
    const country = await getRepository(Country).findOne();
    mockCreateSubscriptionDto = generateSubscription(country);
  });

  it('/subscriptions (POST)', async () => {
    const { body } = await request(app.getHttpServer())
      .post(`/subscriptions`)
      .send(mockCreateSubscriptionDto)
      .expect(201);

    expect(body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        country: expect.objectContaining({
          id: expect.any(String),
        }),
      }),
    );
  });

  it('/subscriptions (POST) - 404', async () => {
    const uuid = faker.datatype.uuid();
    const { body } = await request(app.getHttpServer())
      .post(`/subscriptions/`)
      .send({ ...mockCreateSubscriptionDto, countryId: uuid })
      .expect(404);

    expect(body).toEqual({
      error: 'Not Found',
      message: expect.any(String),
      statusCode: 404,
    });
  });

  it('/subscriptions (POST) - 400', async () => {
    const title = faker.random.words(200);
    const { body } = await request(app.getHttpServer())
      .post(`/subscriptions`)
      .send({ ...mockCreateSubscriptionDto, title })
      .expect(400);

    expect(body).toEqual({
      error: 'Bad Request',
      message: expect.any(Array),
      statusCode: 400,
    });
  });
});
