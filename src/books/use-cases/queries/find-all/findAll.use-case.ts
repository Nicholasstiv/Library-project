import { Injectable } from '@nestjs/common';
import { IBookRepository } from '@/books/domain/repositories/IBooksRepository';
import { Book } from '@/books/domain/entities/book.entity';
import {
  FindAllInput,
  FindAllOutput,
  IFindAllUseCase,
  BookItem,
} from './IfindAll.use-case';
@Injectable()
export class FindAllUseCase implements IFindAllUseCase {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(data: FindAllInput): Promise<FindAllOutput> {
    const limit = Math.min(data.limit ?? 10, 50);

    const books = await this.bookRepository.findAll(limit, data.cursor);

    const hasNextPage = books.length > limit;
    const slice = hasNextPage ? books.slice(0, limit) : books;
    const nextCursor = hasNextPage ? slice[slice.length - 1].id : null;

    return {
      data: slice.map((book) => this.outputMapper(book)),
      nextCursor,
      hasNextPage,
    };
  }

  private outputMapper(book: Book): BookItem {
    return {
      id: book.id,
      title: book.title,
      description: book.description,
      publisher: book.publisher,
      publicationYear: book.publicationYear,
      authors: book.authors,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
    };
  }
}
