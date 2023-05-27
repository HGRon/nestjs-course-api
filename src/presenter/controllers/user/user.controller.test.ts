import { ValidationException } from '@/domain/exceptions/validation_exception';
import { RegisterUsecase } from '@/domain/usecases/user/register.usecase';
import { UserController } from '@/presenter/controllers/user/user.controller';
import { UserDtoMapper } from '@/presenter/models/dto/user/user.dto.mapper';
import { CreateUserPayload } from '@/presenter/models/payloads/user/create-user.payload';
import { mock, MockProxy } from 'jest-mock-extended';
import { makeUser } from '../../../../test/factories/user.factory';

describe('UserController', () => {
  let controller: UserController;
  let registerUsecase: MockProxy<RegisterUsecase>;

  beforeEach(() => {
    registerUsecase = mock<RegisterUsecase>();
    controller = new UserController(registerUsecase);
  });

  describe('Register', () => {
    const params: CreateUserPayload = {
      email: 'Mocked email',
      name: 'Mocked Name',
      role: 'student',
      password: '123456',
    };

    const usecaseOutput = makeUser();

    const expectedResult = UserDtoMapper.toModel(usecaseOutput);

    it('should call register usecase', async () => {
      registerUsecase.call.mockResolvedValueOnce({
        createdUser: usecaseOutput,
      });

      await controller.register(params);

      expect(registerUsecase.call).toHaveBeenCalledTimes(1);
    });

    it('should return the ViewModel', async () => {
      registerUsecase.call.mockResolvedValueOnce({
        createdUser: usecaseOutput,
      });

      const result = await controller.register(params);

      expect(result).toEqual(expectedResult);
    });

    it('should throw an BadRequest HttpException when receiving a ValidationException', async () => {
      const mockedErrorMessage = 'Mocked error';
      registerUsecase.call.mockImplementationOnce(() => {
        throw new ValidationException(mockedErrorMessage);
      });

      expect.assertions(1);
      try {
        await controller.register(params);
      } catch (e) {
        expect(e.status).toBe(400);
      }
    });
  });
});
