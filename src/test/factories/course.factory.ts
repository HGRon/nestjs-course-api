import {
  CourseEntity,
  CourseProps,
} from '@/domain/entities/course/course.entity';
import { CourseTitle } from '@/domain/entities/course/value-objects/name/course-title';
import { EntityProps } from '@/domain/shared/entity';

interface MakeCourseOverrideProps {
  override?: Omit<Partial<CourseProps>, keyof EntityProps>;
  entityPropsOverride?: Partial<EntityProps>;
}

export function makeCourse(
  overrideProps: MakeCourseOverrideProps = {},
): CourseEntity {
  const override = overrideProps.override ?? {};
  const entityPropsOverride = overrideProps.entityPropsOverride ?? {};

  return new CourseEntity(
    {
      title: new CourseTitle('Example Course'),
      ...override,
    },
    {
      id: 1,
      createdAt: new Date(11, 10, 2000),
      updatedAt: new Date(11, 10, 2000),
      ...entityPropsOverride,
    },
  );
}
