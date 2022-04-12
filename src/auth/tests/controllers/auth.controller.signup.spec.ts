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

  describe('Create User', () => {
    beforeEach(async () => {
      await truncate();
    });

    it('should create a new user', async () => {
      const mockSignupDto = generateUser();
      const response = await authController.signUp(mockSignupDto);
      expect(response).toEqual({
        id: expect.any(String),
        name: mockSignupDto.name,
        email: mockSignupDto.email,
      });
    });

    it('should throw an error if password and confirm are different', async () => {
      const mockSignupDto = generateUser();
      mockSignupDto.confirm = faker.random.words(15);
      expect(authController.signUp(mockSignupDto)).rejects.toThrow(
        UnprocessableEntityException,
      );
    });
  });
});
