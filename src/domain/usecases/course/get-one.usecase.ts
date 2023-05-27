import { CourseRepository } from '@/domain/contracts/repositories/course.repository';
import { CourseEntity } from '@/domain/entities/course/course.entity';

export interface GetOneUseCaseInput {
  courseId: number;
}

export interface GetOneUseCaseOutput {
  course: CourseEntity;
}

export class GetOneUsecase
  implements UseCase<GetOneUseCaseInput, GetOneUseCaseOutput>
{
  constructor(private readonly repository: CourseRepository) {}

  public async call(input: GetOneUseCaseInput): Promise<GetOneUseCaseOutput> {
    try {
      const course = await this.repository.get(input.courseId);

      if (course) return null;

      return {
        course,
      };
    } catch (error) {
      throw error;
    }
  }
}
