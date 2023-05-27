import { CourseEntity } from '@/domain/entities/course/course.entity';

export abstract class CourseRepository {
  abstract get(id: number): Promise<CourseEntity>;
  abstract getMany(): Promise<CourseEntity[]>;
  abstract create(course: CourseEntity): Promise<CourseEntity>;
}
