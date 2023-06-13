import {
  LoginUsecase,
  LoginUseCaseOutput,
} from '@/domain/usecases/auth/login.usecase';
import { AuthController } from '@/presenter/controllers/auth/auth.controller';
import { MockProxy, mock } from 'jest-mock-extended';
import { makeUser } from '../../../test/factories/user.factory';

describe('AuthController', () => {
  let controller: AuthController;
  let loginUsecase: MockProxy<LoginUsecase>;

  beforeEach(() => {
    loginUsecase = mock<LoginUsecase>();
    controller = new AuthController(loginUsecase);
  });

  const mockedEntity = makeUser();

  describe('Login', () => {
    const usecaseOutput: LoginUseCaseOutput = {
      jwt: {
        access_token: 'mock',
      },
    };

    it('should call login usecase with the user entity', () => {
      loginUsecase.call.mockReturnValueOnce(usecaseOutput);

      controller.login({ user: mockedEntity });

      expect(loginUsecase.call).toHaveBeenNthCalledWith(1, {
        user: mockedEntity,
      });
    });
  });
});
