import { UserCourseRepository } from '@/domain/contracts/repositories/user-course.repository';
import { UserCourseEntity } from '@/domain/entities/user-course/user-course.entity';

export interface AssociateUserWithCourseUseCaseInput {
  userId: number;
  courseId: number;
}

export interface AssociateUserWithCourseUseCaseOutput {
  associatedUserCourse: UserCourseEntity;
}

export class AssociateUserWithCourseUsecase
  implements
    UseCase<
      AssociateUserWithCourseUseCaseInput,
      AssociateUserWithCourseUseCaseOutput
    >
{
  constructor(private readonly repository: UserCourseRepository) {}

  public async call(
    input: AssociateUserWithCourseUseCaseInput,
  ): Promise<AssociateUserWithCourseUseCaseOutput> {
    const userCourseToCreate = new UserCourseEntity({
      userId: input.userId,
      courseId: input.courseId,
    });

    try {
      const associatedUserCourse = await this.repository.associate(
        userCourseToCreate,
      );

      return {
        associatedUserCourse,
      };
    } catch (error) {
      throw error;
    }
  }
}
