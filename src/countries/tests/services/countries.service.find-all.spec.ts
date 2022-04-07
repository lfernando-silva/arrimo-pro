import { TestingModule } from '@nestjs/testing';

import { CountriesService } from '../../countries.service';
import createTestingModule from '../helpers/create-testing-module';

describe('CountriesService', () => {
  let moduleRef: TestingModule;
  let gameService: CountriesService;

  beforeAll(async () => {
    moduleRef = await createTestingModule();

    gameService = moduleRef.get<CountriesService>(CountriesService);
  });

  afterAll(() => {
    moduleRef.close();
  });

  describe('Find all game (no pagination)', () => {
    it('should find all existing games', async () => {
      const response = await gameService.findAll();

      expect(response.length).toBeGreaterThan(0);
      expect(response).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: expect.any(String) }),
        ]),
      );
    });
  });
});
