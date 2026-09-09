import { UserRole } from '@/users/domain/entities/user.entity';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @MinLength(8)
  @MaxLength(64)
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z0-9!@#$%&*+\-./:=?^_{}~]+$/, {
    message: 'Password contains invalid characters.',
  })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
    message: 'Password must contain at least one number and one letter',
  })
  password!: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role!: UserRole; // Temporary until auth
}
