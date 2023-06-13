import { UserRepository } from '@/domain/contracts/repositories/user.repository';
import { UserEntity } from '@/domain/entities/user/user.entity';

export class UserMemoryRepository implements UserRepository {
  public users: UserEntity[] = [];

  public lastId = 0;

  public shouldThrowErrorAt: 'none' | keyof UserRepository = 'none';

  public async register(user: UserEntity): Promise<UserEntity> {
    if (this.shouldThrowErrorAt === 'register')
      throw new Error('Mocked register error.');

    user.id = this.lastId;
    this.users.push(user);

    this.lastId = this.lastId + 1;

    return user;
  }

  public async getByEmail(email: string): Promise<UserEntity | null> {
    if (this.shouldThrowErrorAt === 'getByEmail')
      throw new Error('Mocked getByEmail error.');

    const user = this.users.find((u: any) => u.email.value === email);

    if (!user) return null;

    return user;
  }
}
