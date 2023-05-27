import { CourseEntity } from '@/domain/entities/course/course.entity';
import { UserCourseEntity } from '@/domain/entities/user-course/user-course.entity';

export abstract class UserCourseRepository {
  abstract associate(userCourse: UserCourseEntity): Promise<UserCourseEntity>;
  abstract getUserCourses(userId: number): Promise<CourseEntity[]>;
}
