import { UserRepository } from '@/domain/contracts/repositories/user.repository';
import { PasswordEncryptionService } from '@/domain/contracts/services/password_encryptation_service';
import { UserEntity } from '@/domain/entities/user/user.entity';
import { UserEmail } from '@/domain/entities/user/value-objects/email/user_email';
import { UserName } from '@/domain/entities/user/value-objects/name/user_name';
import { UserPassword } from '@/domain/entities/user/value-objects/password/user_password';
import { ValidationException } from '@/domain/exceptions/validation_exception';

export interface RegisterUseCaseInput {
  email: string;
  name: string;
  password: string;
  role: string;
}

export interface RegisterUseCaseOutput {
  createdUser: UserEntity;
}

export class RegisterUsecase
  implements UseCase<RegisterUseCaseInput, RegisterUseCaseOutput>
{
  constructor(
    private readonly repository: UserRepository,
    private readonly bcryptService: PasswordEncryptionService,
  ) {}

  public async call(
    input: RegisterUseCaseInput,
  ): Promise<RegisterUseCaseOutput> {
    const userToCreate = new UserEntity({
      email: new UserEmail(input.email),
      name: new UserName(input.name),
      password: new UserPassword(input.password),
      role: input.role,
    });

    const hasUserWithEmail = await this.repository.getByEmail(input.email);

    if (hasUserWithEmail) throw new ValidationException('Email já cadastrado');

    userToCreate.password = new UserPassword(
      await this.bcryptService.hash(input.password),
    );

    try {
      const createdUser = await this.repository.register(userToCreate);

      return {
        createdUser,
      };
    } catch (error) {
      throw error;
    }
  }
}
