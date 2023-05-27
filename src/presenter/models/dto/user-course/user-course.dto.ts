import { ApiProperty } from '@nestjs/swagger';
import { BaseEntityDTO } from '../shared/base-entity-d-t.o';

export class UserCourseDto extends BaseEntityDTO {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  courseId: number;
}
