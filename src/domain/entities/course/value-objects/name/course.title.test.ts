import { CourseTitle } from './course-title';
import { ValidationException } from '@/domain/exceptions/validation_exception';

describe('CourseTitle', () => {
  it('should create a valid course title', () => {
    const titleValue = 'Sample Title';
    const courseTitle = new CourseTitle(titleValue);
    expect(courseTitle.value).toEqual(titleValue);
  });

  it('should throw a ValidationException for an invalid course title with less than 3 characters', () => {
    const titleValue = 'A';
    expect(() => new CourseTitle(titleValue)).toThrowError(ValidationException);
  });

  it('should throw a ValidationException for an invalid course title with more than 1023 characters', () => {
    const titleValue = 'A'.repeat(1025);
    expect(() => new CourseTitle(titleValue)).toThrowError(ValidationException);
  });
});
