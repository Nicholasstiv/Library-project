import { User as PrismaUser } from '@/database/prisma/client';
import { User, UserRole } from '@/users/domain/entities/user.entity';

export class UserMapper {
  static toDomain(raw: PrismaUser): User {
    return new User(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        role: raw.role as UserRole,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }

  static toPersistance(user: User): PrismaUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
