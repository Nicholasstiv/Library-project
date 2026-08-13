import { randomUUID } from 'crypto';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const USER_ROLES = Object.values(UserRole);

export interface UserProps {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(props: UserProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };

    this.validateMail(props.email);
    this.validateRoles(props.role);
  }

  public get id() {
    return this._id;
  }

  public get name() {
    return this.props.name;
  }

  public get email() {
    return this.props.email;
  }

  public get password() {
    return this.props.password;
  }

  public get role() {
    return this.props.role;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }

  private validateMail(email: string) {
    if (!email.includes('@')) throw new Error('Invalid Email');
  }

  private validateRoles(role: UserRole) {
    if (!USER_ROLES.includes(role)) throw new Error('Invalid Role');
  }
}
