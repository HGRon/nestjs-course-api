import { CourseEntity } from '@/domain/entities/course/course.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { CourseTitle } from '@/domain/entities/course/value-objects/name/course-title';

describe('CourseEntity', () => {
  let courseEntity: CourseEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseEntity],
    }).compile();

    courseEntity = module.get<CourseEntity>(CourseEntity);
  });

  it('should set and get the title correctly', () => {
    const title = new CourseTitle('Sample Title');
    courseEntity.title = title;
    expect(courseEntity.title).toEqual(title);
  });
});
