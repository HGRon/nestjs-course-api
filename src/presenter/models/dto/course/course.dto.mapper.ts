import { CourseEntity } from '@/domain/entities/course/course.entity';
import { CourseDto } from './course.dto';

export class CourseDtoMapper {
  static toModel(entity: CourseEntity): CourseDto {
    return {
      id: entity.id,
      createdAt: entity.createdAt,
      title: entity.title.value,
      updatedAt: entity.updatedAt,
    };
  }
}
