import { ApiProperty } from '@nestjs/swagger';

export class BaseEntityDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
