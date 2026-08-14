import { DatabaseService } from '@/database/database.service';
import { User } from '@/users/domain/entities/user.entity';
import { IUserRepository } from '@/users/domain/repositories/IUserRepository';
import { Injectable } from '@nestjs/common';
import { UserMapper } from './mapper/user.mapper';

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
}
