import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCoursePayload {
  @ApiProperty({
    required: true,
  })
  @IsString({ message: 'É necessário enviar o titulo do curso' })
  title: string;
}
