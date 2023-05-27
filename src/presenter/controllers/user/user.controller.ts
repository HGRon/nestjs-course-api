import { UserDto } from '@/presenter/models/dto/user/user.dto';
import { UserDtoMapper } from '@/presenter/models/dto/user/user.dto.mapper';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ValidationException } from '@/domain/exceptions/validation_exception';
import { RegisterUsecase } from '@/domain/usecases/user/register.usecase';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserPayload } from '@/presenter/models/payloads/user/create-user.payload';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly registerUsecase: RegisterUsecase) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar um novo usuário' })
  @ApiCreatedResponse({
    description: 'O usuário foi criado com sucesso',
    type: UserDto,
  })
  public async register(@Body() payload: CreateUserPayload): Promise<UserDto> {
    try {
      const { createdUser } = await this.registerUsecase.call({ ...payload });

      return UserDtoMapper.toModel(createdUser);
    } catch (error) {
      if (error instanceof ValidationException)
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
