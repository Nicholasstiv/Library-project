import { UserRole } from '@/users/domain/entities/user.entity';

export interface FindAllUsersInput {
  role?: UserRole;
}

export interface FindAllUsersOutput {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface IFindAllUsersUseCase {
  execute(data: FindAllUsersInput): Promise<FindAllUsersOutput[]>;
}
