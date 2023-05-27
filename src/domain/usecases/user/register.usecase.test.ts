import { PasswordEncryptionService } from '@/domain/contracts/services/password_encryptation_service';
import { UserEntity } from '@/domain/entities/user/user.entity';
import { UserEmail } from '@/domain/entities/user/value-objects/email/user_email';
import { UserName } from '@/domain/entities/user/value-objects/name/user_name';
import { UserPassword } from '@/domain/entities/user/value-objects/password/user_password';
import { ValidationException } from '@/domain/exceptions/validation_exception';
import {
  RegisterUsecase,
  RegisterUseCaseInput,
} from '@/domain/usecases/user/register.usecase';
import { MockProxy, mock } from 'jest-mock-extended';
import { makeUser } from '../../../test/factories/user.factory';
import { UserMemoryRepository } from '../../../test/repositories/user.memory.repository';

describe('RegisterUsecase', () => {
  let usecase: RegisterUsecase;

  let repository: UserMemoryRepository;

  let encryptationService: MockProxy<PasswordEncryptionService>;

  const encryptedPassword = 'hashpassword';

  beforeEach(() => {
    repository = new UserMemoryRepository();
    encryptationService = mock<PasswordEncryptionService>();

    usecase = new RegisterUsecase(
      repository,
      encryptationService,
    );

    encryptationService.hash.mockResolvedValueOnce(encryptedPassword);
  });

  const entity = makeUser({
    override: {
      email: new UserEmail('valid@email.com'),
      name: new UserName('Mocked name'),
      password: new UserPassword('123456'),
      role: 'student',
    },
  });

  const input: RegisterUseCaseInput = {
    email: 'valid@email.com',
    name: 'Mocked name',
    password: '123456',
    role: 'student',
  };

  it('should register the new user', async () => {
    const { createdUser } = await usecase.call(input);

    expect(repository.users[0].email.value).toEqual(input.email);
    expect(repository.users[0].role).toEqual(input.role);
    expect(repository.users[0].name.value).toEqual(input.name);
    expect(repository.users[0].password.value).toEqual(encryptedPassword);
    expect(repository.users[0]).toEqual(createdUser);
  });

  it('should get an user when calling the repository successfully', async () => {
    const { createdUser } = await usecase.call(input);

    expect(createdUser).toEqual(expect.any(UserEntity));
  });

  it('should call bcrypt service to hash the user password', async () => {
    await usecase.call(input);

    expect(encryptationService.hash).toHaveBeenNthCalledWith(1, input.password);
  });

  it('should not register if the email already exists', async () => {
    repository.register(entity);

    const usecaseCall = async () => await usecase.call(input);

    expect(usecaseCall()).rejects.toThrow(ValidationException);
  });
});
