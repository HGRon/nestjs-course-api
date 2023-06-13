import {
  CreateCourseUsecase,
  CreateCourseUseCaseInput,
} from '@/domain/usecases/course/create.usecase';
import { CourseMemoryRepository } from '../../../test/repositories/course.memory.repository';

describe('RegisterUsecase', () => {
  let usecase: CreateCourseUsecase;
  let repository: CourseMemoryRepository;

  beforeEach(() => {
    repository = new CourseMemoryRepository();
    usecase = new CreateCourseUsecase(repository);
  });

  const input: CreateCourseUseCaseInput = {
    title: 'Example Course',
  };

  it('should register the new course', async () => {
    const { createdCourse } = await usecase.call(input);

    expect(repository.courses[0].title.value).toEqual(input.title);
    expect(repository.courses[0]).toEqual(createdCourse);
  });
});
