import { UserEntity } from '@/domain/entities/user/user.entity';
import { UserDto } from './user.dto';

export class UserDtoMapper {
  static toModel(entity: UserEntity): UserDto {
    return {
      id: entity.id,
      createdAt: entity.createdAt,
      email: entity.email.value,
      name: entity.name.value,
      updatedAt: entity.updatedAt,
      role: entity.role,
    };
  }
}
