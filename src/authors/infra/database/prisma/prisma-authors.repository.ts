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

  async update(data: Author): Promise<Author> {
    const updated = await this.databaseService.author.update({
      where: { id: data.id },
      data: AuthorMapper.toPersistence(data),
      include: { books: true },
    });

    return AuthorMapper.toDomain(updated);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.databaseService.author.deleteMany({
      where: { id },
    });

    return result.count > 0;
  }

  async findById(id: string): Promise<Author | null> {
    const found = await this.databaseService.author.findUnique({
      where: { id },
      include: { books: true },
    });

    return found ? AuthorMapper.toDomain(found) : null;
  }

  async findByIds(
    ids: string[],
  ): Promise<{ id: string; firstName: string; lastName: string }[]> {
    return await this.databaseService.author.findMany({
      where: { id: { in: ids } },
      select: { id: true, firstName: true, lastName: true },
    });
  }

  async findAll(limit: number, cursor?: string): Promise<Author[]> {
    const authors = await this.databaseService.author.findMany({
      take: limit + 1,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      include: { books: true },
    });

    return authors.map((author) => AuthorMapper.toDomain(author));
  }
}
