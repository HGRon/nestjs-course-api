import { UserCourseEntity } from '@/domain/entities/user-course/user-course.entity';
import { UserCourseDto } from './user-course.dto';

export class UserCourseDtoMapper {
  static toModel(entity: UserCourseEntity): UserCourseDto {
    return {
      id: entity.id,
      createdAt: entity.createdAt,
      courseId: entity.courseId,
      userId: entity.userId,
      updatedAt: entity.updatedAt,
    };
  }
}
