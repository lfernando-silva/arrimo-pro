import { TestingModule } from '@nestjs/testing';

import { CountriesController } from '../../countries.controller';
import createTestingModule from '../helpers/create-testing-module';

describe('CountriesController', () => {
  let moduleRef: TestingModule;
  let countriesController: CountriesController;

  beforeAll(async () => {
    moduleRef = await createTestingModule();

    countriesController =
      moduleRef.get<CountriesController>(CountriesController);
  });

  afterAll(() => {
    moduleRef.close();
  });

  describe('Find all countries (no pagination)', () => {
    it('should find all existing countries', async () => {
      const response = await countriesController.findAll();

      expect(response.length).toBeGreaterThan(0);
      expect(response).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: expect.any(String) }),
        ]),
      );
    });
  });
});
