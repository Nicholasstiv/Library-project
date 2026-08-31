import { UserRole } from '@/users/domain/entities/user.entity';

export interface UpdateUserInput {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
}

export interface UpdateUserOutput {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUpdateUserUseCase {
  execute(data: UpdateUserInput): Promise<UpdateUserOutput>;
}
