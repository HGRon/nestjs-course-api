import { ValidateToLoginUsecase } from '@/domain/usecases/auth/validate-to-login.usecase';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Validators } from '@/helpers/validators';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private validateToLoginUsecase: ValidateToLoginUsecase) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const isValidEmail = Validators.isValidEmail(email);
    const isValidPassword = Validators.isValidPassword(password);

    if (!isValidEmail) throw new BadRequestException('Email inválido.');

    if (!isValidPassword) throw new BadRequestException('Senha inválida.');

    const { user } = await this.validateToLoginUsecase.call({
      email,
      password,
    });

    if (!user)
      throw new UnauthorizedException(
        'Usuário não encontrado ou senha incorreta.',
      );

    return user;
  }
}
