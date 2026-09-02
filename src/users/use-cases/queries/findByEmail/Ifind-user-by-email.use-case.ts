import { UserRole } from '@/users/domain/entities/user.entity';

export interface FindUserByEmailOutput {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFindUserByEmail {
  execute(email: string): Promise<FindUserByEmailOutput>;
}
