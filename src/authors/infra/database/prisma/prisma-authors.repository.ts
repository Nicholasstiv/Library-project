import { Author } from '@/authors/domain/entities/author.entity';
import { IAuthorRepository } from '@/authors/domain/repositories/IAuthor.repository';
import { DatabaseService } from '@/database/database.service';
import { Injectable } from '@nestjs/common';
import { AuthorMapper } from './mapper/author.mapper';

@Injectable()
export class PrismaAuthorRepository implements IAuthorRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: Author): Promise<Author> {
    const created = await this.databaseService.author.create({
      data: AuthorMapper.toPersistence(data),
      include: { books: true },
    });

    return AuthorMapper.toDomain(created);
  }

  async findByIds(
    ids: string[],
  ): Promise<{ id: string; firstName: string; lastName: string }[]> {
    return await this.databaseService.author.findMany({
      where: { id: { in: ids } },
      select: { id: true, firstName: true, lastName: true },
    });
  }
}
