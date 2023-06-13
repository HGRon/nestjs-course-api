import { UserEntity, UserProps } from '@/domain/entities/user/user.entity';
import { UserEmail } from '@/domain/entities/user/value-objects/email/user_email';
import { UserName } from '@/domain/entities/user/value-objects/name/user_name';
import { UserPassword } from '@/domain/entities/user/value-objects/password/user_password';
import { EntityProps } from '@/domain/shared/entity';

interface MakeUserOverrideProps {
  override?: Omit<Partial<UserProps>, keyof EntityProps>;
  entityPropsOverride?: Partial<EntityProps>;
}

export function makeUser(
  overrideProps: MakeUserOverrideProps = {},
): UserEntity {
  const override = overrideProps.override ?? {};
  const entityPropsOverride = overrideProps.entityPropsOverride ?? {};

  return new UserEntity(
    {
      email: new UserEmail('valid@email.com'),
      name: new UserName('Mocked Name'),
      password: new UserPassword('123456'),
      role: 'student',
      ...override,
    },
    {
      id: 1,
      createdAt: new Date(11, 10, 2000),
      updatedAt: new Date(11, 10, 2000),
      ...entityPropsOverride,
    },
  );
}
