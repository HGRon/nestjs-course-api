import { CourseRepository } from '@/domain/contracts/repositories/course.repository';

import { CourseEntity } from '@/domain/entities/course/course.entity';

export class CourseMemoryRepository implements CourseRepository {
  public courses: CourseEntity[] = [];
  public lastId = 0;

  public async getMany(): Promise<CourseEntity[]> {
    return this.courses;
  }

  public async get(id: number): Promise<CourseEntity> {
    const foundCourse = this.courses.find((course) => course.id === id);

    if (!foundCourse) return Promise.resolve(null);

    return Promise.resolve(foundCourse);
  }

  public async create(course: CourseEntity): Promise<CourseEntity> {
    course.id = this.lastId;
    this.courses.push(course);

    this.lastId = this.lastId + 1;

    return course;
  }
}
