import { Book } from '../entities/book.entity';

export abstract class IBookRepository {
  abstract create(data: Book): Promise<Book>;
  abstract update(data: Book): Promise<Book>;
  abstract delete(id: string): Promise<boolean>;
  abstract findById(id: string): Promise<Book | null>;
  abstract findByAuthor(authorId: string): Promise<Book[]>;
  abstract findAll(limit: number, cursor?: string): Promise<Book[]>;
}
