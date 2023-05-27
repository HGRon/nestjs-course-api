import { CourseTitle } from '@/domain/entities/course/value-objects/name/course-title';
import { UserCourseEntity } from '@/domain/entities/user-course/user-course.entity';
import { Entity, EntityProps } from '../../shared/entity';

export interface CourseProps {
  title: CourseTitle;

  userCourses?: UserCourseEntity[];
}

export class CourseEntity extends Entity<CourseProps> {
  constructor(props: CourseProps, entityProps?: EntityProps) {
    super(props, entityProps);
  }

  public set title(title: CourseTitle) {
    this.props.title = title;
  }

  public get title(): CourseTitle {
    return this.props.title;
  }
}
