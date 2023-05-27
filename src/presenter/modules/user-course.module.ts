import { UserCourseRepository } from '@/domain/contracts/repositories/user-course.repository';
import { AssociateUserWithCourseUsecase } from '@/domain/usecases/user-course/associate-user-with-course.usecase';
import { UserCourseController } from '@/presenter/controllers/user-course/user-course.controller';
import { Module } from '@nestjs/common';
import { AuthModule } from '@/presenter/modules/auth.module';
import { UserCourseMemoryRepository } from '../../test/repositories/user-course.memory.repository';

@Module({
  imports: [AuthModule],
  controllers: [UserCourseController],
  providers: [
    {
      provide: AssociateUserWithCourseUsecase,
      useFactory: (repository: UserCourseRepository) => {
        return new AssociateUserWithCourseUsecase(repository);
      },
      inject: [UserCourseRepository],
    },
    {
      provide: UserCourseRepository,
      useClass: UserCourseMemoryRepository,
    },
  ],
})
export class UserCourseModule {}
