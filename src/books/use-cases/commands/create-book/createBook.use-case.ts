import { Injectable } from '@nestjs/common';
import {
  CreateBookInput,
  CreateBookOutput,
  ICreateBookUseCase,
} from './IcreateBook.use-case';
import { IBookRepository } from '@/books/domain/repositories/IBooksRepository';
import { Book } from '@/books/domain/entities/book.entity';

@Injectable()
export class CreateBookUseCase implements ICreateBookUseCase {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(data: CreateBookInput): Promise<CreateBookOutput> {
    const book = new Book({
      title: data.title,
      description: data.description,
      publisher: data.publisher,
      publicationYear: data.publicationYear,
      authors: data.authors,
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
