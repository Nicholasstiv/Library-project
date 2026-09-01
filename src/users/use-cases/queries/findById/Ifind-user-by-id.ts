import { UserRole } from '@/users/domain/entities/user.entity';

export interface FindUserByIdOutput {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFindUserByIdUseCase {
  execute(id: string): Promise<FindUserByIdOutput>;
}
