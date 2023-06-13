import { UserCourseEntity } from './user-course.entity';

describe('UserCourseEntity', () => {
  let userCourseEntity: UserCourseEntity;
  const userId = 1;
  const courseId = 2;

  beforeEach(() => {
    userCourseEntity = new UserCourseEntity({ userId, courseId });
  });

  it('should set and get the userId correctly', () => {
    userCourseEntity.userId = 3;
    expect(userCourseEntity.userId).toEqual(3);
  });

  it('should set and get the courseId correctly', () => {
    userCourseEntity.courseId = 4;
    expect(userCourseEntity.courseId).toEqual(4);
  });
});
