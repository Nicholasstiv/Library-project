import { UserRole } from '@/users/domain/entities/user.entity';

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginOutput {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
}

export interface ILoginUseCase {
  execute(data: LoginInput): Promise<LoginOutput>;
}
