import { TestDateUtils } from '../../../test/utils/test_date_utils';
import { UserEntity } from './user.entity';
import { UserEmail } from './value-objects/email/user_email';
import { UserName } from './value-objects/name/user_name';
import { UserPassword } from './value-objects/password/user_password';

describe('UserEntity', () => {
  beforeAll(() => {
    TestDateUtils.setTestDate(new Date());
  });

  afterAll(() => {
    TestDateUtils.resetTestDate();
  });

  it('should be able to instantiate the entity', () => {
    const entity = new UserEntity({
      email: new UserEmail('valid@email.com'),
      name: new UserName('Mocked Name'),
      password: new UserPassword('123456'),
      role: 'admin',
    });

    expect(entity).toBeDefined();
  });
});
