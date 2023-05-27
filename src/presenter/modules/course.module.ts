import { CourseRepository } from '@/domain/contracts/repositories/course.repository';
import { CreateCourseUsecase } from '@/domain/usecases/course/create.usecase';
import { GetManyUsecase } from '@/domain/usecases/course/get-many.usecase';
import { GetOneUsecase } from '@/domain/usecases/course/get-one.usecase';
import { CourseController } from '@/presenter/controllers/course/course.controller';
import { Module } from '@nestjs/common';
import { AuthModule } from '@/presenter/modules/auth.module';
import { CourseMemoryRepository } from '../../../test/repositories/course.memory.repository';

@Module({
  imports: [AuthModule],
  controllers: [CourseController],
  providers: [
    {
      provide: CreateCourseUsecase,
      useFactory: (repository: CourseRepository) => {
        return new CreateCourseUsecase(repository);
      },
      inject: [CourseRepository],
    },
    {
      provide: GetManyUsecase,
      useFactory: (repository: CourseRepository) => {
        return new GetManyUsecase(repository);
      },
      inject: [CourseRepository],
    },
    {
      provide: GetOneUsecase,
      useFactory: (repository: CourseRepository) => {
        return new GetOneUsecase(repository);
      },
      inject: [CourseRepository],
    },
    {
      provide: CourseRepository,
      useClass: CourseMemoryRepository,
    },
  ],
})
export class CourseModule {}
