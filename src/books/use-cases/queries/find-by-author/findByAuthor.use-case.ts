import { Injectable } from '@nestjs/common';
import { IBookRepository } from '@/books/domain/repositories/IBooksRepository';
import { Book } from '@/books/domain/entities/book.entity';
import {
  IFindByAuthorUseCase,
  FindByAuthorOutput,
} from './IfindByAuthor.use-case';

@Injectable()
export class FindByAuthorUseCase implements IFindByAuthorUseCase {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(authorId: string): Promise<FindByAuthorOutput[]> {
    const authorBooks = await this.bookRepository.findByAuthor(authorId);

    return authorBooks.map((book) => this.outputMapper(book));
  }

  private outputMapper(book: Book): FindByAuthorOutput {
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
