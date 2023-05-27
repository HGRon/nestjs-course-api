import { ApiProperty } from '@nestjs/swagger';
import { BaseEntityDTO } from '../shared/base-entity-d-t.o';

export class UserDto extends BaseEntityDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  role: string;
}
