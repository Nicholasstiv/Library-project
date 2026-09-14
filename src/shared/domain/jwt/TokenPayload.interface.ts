import { UserRole } from '@/users/domain/entities/user.entity';

export interface TokenPayload {
  sub: string;
  role: UserRole;
}
