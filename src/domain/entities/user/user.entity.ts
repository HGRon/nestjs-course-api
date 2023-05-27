import { UserCourseEntity } from '@/domain/entities/user-course/user-course.entity';
import { Entity, EntityProps } from '../../shared/entity';
import { UserEmail } from './value-objects/email/user_email';
import { UserName } from './value-objects/name/user_name';
import { UserPassword } from './value-objects/password/user_password';

export interface UserProps {
  email: UserEmail;
  name: UserName;
  password: UserPassword;
  role: string;

  userCourses?: UserCourseEntity[];
}

export class UserEntity extends Entity<UserProps> {
  constructor(props: UserProps, entityProps?: EntityProps) {
    super(props, entityProps);
  }

  public set role(role) {
    this.props.role = role;
  }

  public get role(): string {
    return this.props.role;
  }

  public set email(email: UserEmail) {
    this.props.email = email;
  }

  public get email(): UserEmail {
    return this.props.email;
  }

  public set name(name: UserName) {
    this.props.name = name;
  }

  public get name(): UserName {
    return this.props.name;
  }

  public set password(password: UserPassword) {
    this.props.password = password;
  }

  public get password(): UserPassword {
    return this.props.password;
  }
}
