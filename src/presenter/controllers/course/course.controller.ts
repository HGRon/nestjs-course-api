import { UserEntity } from '@/domain/entities/user/user.entity';
import { CreateCourseUsecase } from '@/domain/usecases/course/create.usecase';
import { GetManyUsecase } from '@/domain/usecases/course/get-many.usecase';
import { GetOneUsecase } from '@/domain/usecases/course/get-one.usecase';
import { CourseDto } from '@/presenter/models/dto/course/course.dto';
import { CourseDtoMapper } from '@/presenter/models/dto/course/course.dto.mapper';
import { CreateCoursePayload } from '@/presenter/models/payloads/course/create-course.payload';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { ValidationException } from '@/domain/exceptions/validation_exception';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Courses')
@Controller('course')
export class CourseController {
  constructor(
    private readonly createCourseUsecase: CreateCourseUsecase,
    private readonly getManyUsecase: GetManyUsecase,
    private readonly getOneUsecase: GetOneUsecase,
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Curso pelo id' })
  @ApiCreatedResponse({
    description: 'Curso pelo id',
    type: CourseDto,
  })
  public async getOne(@Param('id') id: number): Promise<CourseDto> {
    try {
      const { course } = await this.getOneUsecase.call({ courseId: id });

      return CourseDtoMapper.toModel(course);
    } catch (error) {
      if (error instanceof ValidationException)
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Lista de cursos' })
  @ApiCreatedResponse({
    description: 'Lista de cursos',
    type: CourseDto,
    isArray: true,
  })
  public async getMany(): Promise<CourseDto[]> {
    try {
      const { courses } = await this.getManyUsecase.call();

      if (!courses) return [];

      return courses.map((course) => CourseDtoMapper.toModel(course));
    } catch (error) {
      if (error instanceof ValidationException)
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Cadastrar um novo curso' })
  @ApiCreatedResponse({
    description: 'O curso foi criado com sucesso',
    type: CourseDto,
  })
  public async create(
    @Req() req: { user: UserEntity },
    @Body() payload: CreateCoursePayload,
  ): Promise<CourseDto> {
    try {
      const { createdCourse } = await this.createCourseUsecase.call({
        ...payload,
      });

      return CourseDtoMapper.toModel(createdCourse);
    } catch (error) {
      if (error instanceof ValidationException)
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
