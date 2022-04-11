import { TestingModule } from '@nestjs/testing';

import { CountriesService } from '../../countries.service';
import createTestingModule from '../../../helpers/tests/create-testing-module';

describe('CountriesService', () => {
  let moduleRef: TestingModule;
  let countriesService: CountriesService;

  beforeAll(async () => {
    moduleRef = await createTestingModule();

    countriesService = moduleRef.get<CountriesService>(CountriesService);
  });

  afterAll(() => {
    moduleRef.close();
  });

  describe('Find all countries (no pagination)', () => {
    it('should find all existing countries', async () => {
      const response = await countriesService.findAll();

      expect(response.length).toBeGreaterThan(0);
      expect(response).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: expect.any(String) }),
        ]),
      );
    });
  });
});
