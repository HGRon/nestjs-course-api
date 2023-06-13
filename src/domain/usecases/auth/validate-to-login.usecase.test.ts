import { PasswordEncryptionService } from '@/domain/contracts/services/password_encryptation_service';
import { UserEmail } from '@/domain/entities/user/value-objects/email/user_email';
import { UserPassword } from '@/domain/entities/user/value-objects/password/user_password';
import { ValidateToLoginUsecase } from '@/domain/usecases/auth/validate-to-login.usecase';
import { MockProxy, mock } from 'jest-mock-extended';
import { makeUser } from '../../../test/factories/user.factory';
import { UserMemoryRepository } from '../../../test/repositories/user.memory.repository';

describe('ValidateToLoginUsecase', () => {
  let repository: UserMemoryRepository;
  let encryptationService: MockProxy<PasswordEncryptionService>;
  let usecase: ValidateToLoginUsecase;

  beforeEach(() => {
    repository = new UserMemoryRepository();
    encryptationService = mock<PasswordEncryptionService>();
    usecase = new ValidateToLoginUsecase(repository, encryptationService);
  });

  it('should return the user if the repository returns and the password is correct', async () => {
    const email = 'valid@email.com';
    const password = '123456';

    const createdUser = makeUser({
      override: {
        email: new UserEmail(email),
        password: new UserPassword(password),
      },
    });

    repository.register(createdUser);
    encryptationService.compare.mockResolvedValueOnce(true);

    const { user } = await usecase.call({ email, password });

    expect(user).toEqual(createdUser);
  });

  it("should return null if the repository don't find a user with the given email", async () => {
    const { user } = await usecase.call({
      email: 'valid@email.com',
      password: '123456',
    });

    expect(user).toBeNull();
  });

  it('should return null if the given password is incorrect', async () => {
    const email = 'valid@email.com';
    const password = '123456';

    const createdUser = makeUser({
      override: {
        email: new UserEmail(email),
        password: new UserPassword(password),
      },
    });

    repository.register(createdUser);
    encryptationService.compare.mockResolvedValue(false);

    const { user } = await usecase.call({ email, password });

    expect(user).toBeNull();
  });
});
