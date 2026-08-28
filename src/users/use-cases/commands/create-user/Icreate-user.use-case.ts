import { UserRole } from '@/users/domain/entities/user.entity';

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface CreateUserOutput {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateUserUseCase {
  execute(data: CreateUserInput): Promise<CreateUserOutput>;
}
