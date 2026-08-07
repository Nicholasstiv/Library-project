import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateBookInput,
  CreateBookOutput,
  ICreateBookUseCase,
} from './IcreateBook.use-case';
import { IBookRepository } from '@/books/domain/repositories/IBooksRepository';
import { Book } from '@/books/domain/entities/book.entity';
import { IAuthorRepository } from '@/authors/domain/repositories/IAuthor.repository';

@Injectable()
export class CreateBookUseCase implements ICreateBookUseCase {
  constructor(
    private readonly bookRepository: IBookRepository,
    private readonly authorRepository: IAuthorRepository,
  ) {}

  async execute(data: CreateBookInput): Promise<CreateBookOutput> {
    const authors = await this.authorRepository.findByIds(data.authors);

    if (authors.length !== data.authors.length) {
      throw new NotFoundException('Authors not found!');
    }

    const book = new Book({
      title: data.title,
      description: data.description,
      publisher: data.publisher,
      publicationYear: data.publicationYear,
      authors,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const createdBook = await this.bookRepository.create(book);

    return this.outputMapper(createdBook);
  }

  private outputMapper(book: Book): CreateBookOutput {
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
