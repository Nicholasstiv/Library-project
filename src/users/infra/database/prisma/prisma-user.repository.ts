import { DatabaseService } from '@/database/database.service';
import { User } from '@/users/domain/entities/user.entity';
import { IUserRepository } from '@/users/domain/repositories/IUserRepository';
import { Injectable } from '@nestjs/common';
import { UserMapper } from './mapper/user.mapper';
import { UserRole } from '@/database/prisma/enums';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: User): Promise<User> {
    const created = await this.databaseService.user.create({
      data: UserMapper.toPersistance(data),
    });

    return UserMapper.toDomain(created);
  }

  async update(data: User): Promise<User> {
    const updated = await this.databaseService.user.update({
      where: { id: data.id },
      data: UserMapper.toPersistance(data),
    });

    return UserMapper.toDomain(updated);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.databaseService.user.deleteMany({
      where: { id },
    });

    return result.count > 0;
  }

  async findById(id: string): Promise<User | null> {
    const found = await this.databaseService.user.findUnique({
      where: { id },
    });

    return found ? UserMapper.toDomain(found) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const found = await this.databaseService.user.findUnique({
      where: { email },
    });

    return found ? UserMapper.toDomain(found) : null;
  }

  async findAll(role?: string): Promise<User[]> {
    const users = await this.databaseService.user.findMany({
      where: { role: (role as UserRole) ?? undefined },
    });

    return users.map((user) => UserMapper.toDomain(user));
  }
}
