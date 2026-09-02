import { UserRole } from '@/users/domain/entities/user.entity';

export interface FindAllUsersOutput {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface IFindAllUsersUseCase {
  execute(role?: UserRole): Promise<FindAllUsersOutput[]>;
}
