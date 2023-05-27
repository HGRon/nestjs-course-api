import { UserEntity } from '@/domain/entities/user/user.entity';
import { LoginUsecase } from '@/domain/usecases/auth/login.usecase';
import { LocalAuthGuard } from '@/infra/guards/authentication/local_auth_guard';
import { LoginPayload } from '@/presenter/models/payloads/auth/login.payload';
import { SuccessLoginDto } from '@/presenter/models/dto/auth/success-login.dto';
import { UserDtoMapper } from '@/presenter/models/dto/user/user.dto.mapper';
import { Controller, UseGuards, Post, Request } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly loginUsecase: LoginUsecase) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({
    description: 'Os dados para login',
    type: LoginPayload,
    required: true,
  })
  @ApiOperation({ summary: 'Gerar um token de usuário (JWT)' })
  @ApiOkResponse({
    description: 'O token foi gerado com sucesso',
    type: SuccessLoginDto,
  })
  public async login(
    @Request() { user }: { user: UserEntity },
  ): Promise<SuccessLoginDto> {
    const { jwt } = this.loginUsecase.call({
      user,
    });

    return {
      jwt,
      user: UserDtoMapper.toModel(user),
    };
  }
}
