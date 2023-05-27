import { CourseRepository } from '@/domain/contracts/repositories/course.repository';
import { UserCourseRepository } from "@/domain/contracts/repositories/user-course.repository";

import { CourseEntity } from '@/domain/entities/course/course.entity';
import { UserCourseEntity } from "@/domain/entities/user-course/user-course.entity";

export class UserCourseMemoryRepository implements UserCourseRepository {
  public courses: UserCourseEntity[] = [];

  public async getUserCourses(userId: number): Promise<CourseEntity[]> {
    return Promise.resolve([]);
  }

  public async associate(UserCourse: UserCourseEntity): Promise<UserCourseEntity> {


    return Promise.resolve(undefined);
  }
}
