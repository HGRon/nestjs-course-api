import { AssociateUserWithCourseUsecase } from '@/domain/usecases/user-course/associate-user-with-course.usecase';
import { UserCourseDto } from '@/presenter/models/dto/user-course/user-course.dto';
import { UserCourseDtoMapper } from '@/presenter/models/dto/user-course/user-course.dto.mapper';
import { CreateUserCoursePayload } from '@/presenter/models/payloads/user-course/create-user-course.payload';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ValidationException } from '@/domain/exceptions/validation_exception';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users Courses')
@Controller('users-courses')
export class UserCourseController {
  constructor(
    private readonly associateUserWithCourseUsecase: AssociateUserWithCourseUsecase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Associar usuário com novo curso' })
  @ApiCreatedResponse({
    description: 'O curso foi associado ao usuário',
    type: UserCourseDto,
  })
  public async associateUserWithCourse(
    @Body() input: CreateUserCoursePayload,
  ): Promise<UserCourseDto> {
    try {
      const { associatedUserCourse } =
        await this.associateUserWithCourseUsecase.call({
          ...input,
        });

      return UserCourseDtoMapper.toModel(associatedUserCourse);
    } catch (error) {
      if (error instanceof ValidationException)
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
