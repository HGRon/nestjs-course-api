import { LoginUsecase } from '@/domain/usecases/auth/login.usecase';
import { ValidateToLoginUsecase } from '@/domain/usecases/auth/validate-to-login.usecase';
import { AuthController } from '@/presenter/controllers/auth/auth.controller';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@/infra/strategies/authentication/local_strategy';
import { JwtStrategy } from '@/infra/strategies/authentication/jwt_strategy';
import { UserRepository } from '@/domain/contracts/repositories/user.repository';
import { PasswordEncryptionService } from '@/domain/contracts/services/password_encryptation_service';
import { JwtServiceImplementation } from '@/infra/services/jwt_service_implementation';
import { JwtService } from '@/domain/contracts/services/jwt_service';
import { BcryptPasswordEncryptionService } from '@/infra/services/bcrypt_password_encryptation_service';
import { ConfigService } from '@nestjs/config';
import { ENV_AUTH_CONFIG_KEY } from '@/infra/configurations/authentication.config';
import { UserMemoryRepository } from '../../test/repositories/user.memory.repository';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get(ENV_AUTH_CONFIG_KEY),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    JwtStrategy,
    {
      provide: LoginUsecase,
      useFactory: (jwtService: JwtService) => new LoginUsecase(jwtService),
      inject: [JwtService],
    },
    {
      provide: ValidateToLoginUsecase,
      useFactory: (
        repository: UserRepository,
        bcryptService: PasswordEncryptionService,
      ) => {
        return new ValidateToLoginUsecase(repository, bcryptService);
      },
      inject: [UserRepository, PasswordEncryptionService],
    },
    {
      provide: UserRepository,
      useClass: UserMemoryRepository,
    },
    {
      provide: JwtService,
      useClass: JwtServiceImplementation,
    },
    {
      provide: PasswordEncryptionService,
      useClass: BcryptPasswordEncryptionService,
    },
  ],
})
export class AuthModule {}
