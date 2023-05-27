import { ApiProperty } from '@nestjs/swagger';
import { BaseEntityDTO } from '../shared/base-entity-d-t.o';

export class CourseDto extends BaseEntityDTO {
  @ApiProperty()
  title: string;
}
