import { UserRepository } from '@/domain/contracts/repositories/user.repository';
import { PasswordEncryptionService } from '@/domain/contracts/services/password_encryptation_service';
import { RegisterUsecase } from '@/domain/usecases/user/register.usecase';
import { BcryptPasswordEncryptionService } from '@/infra/services/bcrypt_password_encryptation_service';
import { UserController } from '@/presenter/controllers/user/user.controller';
import { Module } from '@nestjs/common';
import { AuthModule } from '@/presenter/modules/auth.module';
import { UserMemoryRepository } from '../../test/repositories/user.memory.repository';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [
    {
      provide: RegisterUsecase,
      useFactory: (
        repository: UserRepository,
        bcryptService: PasswordEncryptionService,
      ) => {
        return new RegisterUsecase(repository, bcryptService);
      },
      inject: [UserRepository, PasswordEncryptionService],
    },
    {
      provide: UserRepository,
      useClass: UserMemoryRepository,
    },
    {
      provide: PasswordEncryptionService,
      useClass: BcryptPasswordEncryptionService,
    },
  ],
})
export class UserModule {}
