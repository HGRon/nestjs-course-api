import { CourseRepository } from '@/domain/contracts/repositories/course.repository';
import { CourseEntity } from '@/domain/entities/course/course.entity';

export interface GetManyCoursesUseCaseOutput {
  courses: CourseEntity[];
}

export class GetManyUsecase implements UseCaseOutput<GetManyCoursesUseCaseOutput> {
  constructor(private readonly repository: CourseRepository) {}

  public async call(): Promise<GetManyCoursesUseCaseOutput> {
    try {
      const courses = await this.repository.getMany();

      return {
        courses,
      };
    } catch (error) {
      throw error;
    }
  }
}
