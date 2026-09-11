import { UserRole } from '@/users/domain/entities/user.entity';
import { IsEnum, IsOptional } from 'class-validator';

export class FindAllUsersDto {
  @IsOptional()
  @IsEnum(UserRole)
  role!: UserRole;
}
