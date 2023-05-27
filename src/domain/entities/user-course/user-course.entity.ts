import { CourseEntity } from '@/domain/entities/course/course.entity';
import { UserEntity } from '@/domain/entities/user/user.entity';
import { Entity, EntityProps } from '@/domain/shared/entity';

export interface UserCourseProps {
  userId: number;
  courseId: number;

  course?: CourseEntity;
  user?: UserEntity;
}

export class UserCourseEntity extends Entity<UserCourseProps> {
  constructor(props: UserCourseProps, entityProps?: EntityProps) {
    super(props, entityProps);
  }

  public set courseId(courseId: number) {
    this.props.courseId = courseId;
  }

  public get courseId(): number {
    return this.props.courseId;
  }

  public set userId(userId: number) {
    this.props.userId = userId;
  }

  public get userId(): number {
    return this.props.userId;
  }
}
