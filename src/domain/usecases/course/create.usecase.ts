import { CourseRepository } from '@/domain/contracts/repositories/course.repository';
import { CourseEntity } from '@/domain/entities/course/course.entity';
import { CourseTitle } from '@/domain/entities/course/value-objects/name/course-title';

export interface CreateCourseUseCaseInput {
  title: string;
}

export interface CreateCourseUseCaseOutput {
  createdCourse: CourseEntity;
}

export class CreateCourseUsecase implements UseCase<CreateCourseUseCaseInput, CreateCourseUseCaseOutput> {
  constructor(private readonly repository: CourseRepository) {}

  public async call(
    input: CreateCourseUseCaseInput,
  ): Promise<CreateCourseUseCaseOutput> {
    const courseToCreate = new CourseEntity({
      title: new CourseTitle(input.title),
    });

    try {
      const createdCourse = await this.repository.create(courseToCreate);

      return {
        createdCourse,
      };
    } catch (error) {
      throw error;
    }
  }
}
