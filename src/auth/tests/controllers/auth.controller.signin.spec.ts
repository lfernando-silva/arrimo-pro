import { UnprocessableEntityException } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';

import { AuthController } from '../../auth.controller';
import truncate from '../../../helpers/tests/truncate';
import createTestingModule from '../../../helpers/tests/create-testing-module';
import { generateUser } from '../../../helpers/tests/generate-data';

describe('AuthController', () => {
  let moduleRef: TestingModule;
  let authController: AuthController;

  beforeAll(async () => {
    moduleRef = await createTestingModule();

    authController = moduleRef.get<AuthController>(AuthController);
  });

  afterAll(() => {
    moduleRef.close();
  });

  describe('Sigin', () => {
    beforeEach(async () => {
      await truncate();
    });

    it('Should login and receibe an auth token', async () => {
      const mockSignupDto = generateUser();
      await authController.signUp(mockSignupDto);
      const response = await authController.signIn({
        email: mockSignupDto.email,
        password: mockSignupDto.password,
      });
      expect(response).toEqual({
        token: expect.any(String),
      });
    });

    it('should throw an error if password does not match.', async () => {
      const mockSignupDto = generateUser();
      await authController.signUp(mockSignupDto);
      mockSignupDto.confirm = faker.random.words(15);
      expect(
        authController.signUp({ ...mockSignupDto, password: 'wrongPass123' }),
      ).rejects.toThrow(UnprocessableEntityException);
    });
  });
});
