import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserCoursePayload {
  @ApiProperty({
    required: true,
  })
  @IsString({ message: 'É necessário enviar o id do usuário' })
  userId: number;

  @ApiProperty({
    required: true,
  })
  @IsString({ message: 'É necessário enviar o id do curso' })
  courseId: number;
}
