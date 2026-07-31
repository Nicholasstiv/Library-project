import { Book } from '@/books/domain/entities/book.entity';
import { IBookRepository } from '@/books/domain/repositories/IBooksRepository';
import { DatabaseService } from '@/database/database.service';
import { Injectable } from '@nestjs/common';
import { BookMapper } from './mapper/books.mapper';

@Injectable()
export class PrismaBookRepository implements IBookRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: Book): Promise<Book> {
    const created = await this.databaseService.book.create({
      data: {
        ...BookMapper.toPersistance(data),
        authors: {
          connect: data.authors.map((author) => ({ id: author.id })),
        },
      },
      include: { authors: true },
    });

    return BookMapper.toDomain(created);
  }

  async update(id: string, data: Book): Promise<Book> {
    const updated = await this.databaseService.book.update({
      where: { id },
      data: {
        ...BookMapper.toPersistance(data),
        authors: {
          set: data.authors.map((author) => ({ id: author.id })),
        },
      },
      include: { authors: true },
    });

    return BookMapper.toDomain(updated);
  }

  async findAll(limit = 10, cursor?: string): Promise<Book[]> {
    const books = await this.databaseService.book.findMany({
      take: limit + 1,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: 'desc' },
      include: { authors: true },
    });

    return books.map((book) => BookMapper.toDomain(book));
  }

  async findById(id: string): Promise<Book | null> {
    const found = await this.databaseService.book.findUnique({
      where: { id },
      include: { authors: true },
    });

    return found ? BookMapper.toDomain(found) : null;
  }

  async findByAuthor(authorId: string): Promise<Book[]> {
    const found = await this.databaseService.book.findMany({
      where: { authors: { some: { id: authorId } } },
      include: { authors: true },
    });

    return found.map((book) => BookMapper.toDomain(book));
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.databaseService.book.deleteMany({
      where: { id },
    });

    return result.count > 0;
  }
}
