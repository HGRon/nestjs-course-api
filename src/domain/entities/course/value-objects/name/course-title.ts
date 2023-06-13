import { ValidationException } from '@/domain/exceptions/validation_exception';
import { ValueObjectOptions } from '@/domain/models/interfaces/value-object-options.interface';

export class CourseTitle {
  constructor(value: string, options?: ValueObjectOptions) {
    const defaultOptions: ValueObjectOptions = {
      validate: true,
    };

    const { validate } = Object.assign(defaultOptions, options);

    if (validate) {
      const hasValidLength = this.validate(value);

      if (!hasValidLength)
        throw new ValidationException(
          'O titutlo do curso deve conter entre 3 e 1024 caracteres.',
        );
    }

    this.title = value;
  }

  private readonly title: string;

  get value(): string {
    return this.title;
  }
  private validate(value: string): boolean {
    return value.trim().length >= 3 && value.trim().length < 1024;
  }
}
