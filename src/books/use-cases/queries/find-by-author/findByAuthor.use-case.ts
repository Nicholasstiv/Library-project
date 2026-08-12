import { Injectable, NotFoundException } from '@nestjs/common';
import { IBookRepository } from '@/books/domain/repositories/IBooksRepository';
import { Book } from '@/books/domain/entities/book.entity';
import {
  IFindByAuthorUseCase,
  FindByAuthorOutput,
} from './IfindByAuthor.use-case';
import { IAuthorRepository } from '@/authors/domain/repositories/IAuthor.repository';

@Injectable()
export class FindByAuthorUseCase implements IFindByAuthorUseCase {
  constructor(
    private readonly bookRepository: IBookRepository,
    private readonly authorRepository: IAuthorRepository,
  ) {}

  async execute(authorId: string): Promise<FindByAuthorOutput[]> {
    const author = await this.authorRepository.findById(authorId);

    if (!author) throw new NotFoundException('Author not found!');

    const authorBooks = await this.bookRepository.findByAuthor(author.id);

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
