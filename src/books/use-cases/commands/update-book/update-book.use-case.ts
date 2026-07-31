import { Injectable, NotFoundException } from '@nestjs/common';
import {
  IUpdateBookUseCase,
  UpdateBookInput,
  UpdateBookOutput,
} from './Iupdate-book.use-case';
import { IBookRepository } from '@/books/domain/repositories/IBooksRepository';
import { Book } from '@/books/domain/entities/book.entity';

@Injectable()
export class UpdateBookUseCase implements IUpdateBookUseCase {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(id: string, data: UpdateBookInput): Promise<UpdateBookOutput> {
    const existingBook = await this.bookRepository.findById(id);

    if (!existingBook) throw new NotFoundException('Book not found!');

    const newBook = new Book(
      {
        title: data.title ?? existingBook.title,
        description: data.description ?? existingBook.description,
        publicationYear: data.publicationYear ?? existingBook.publicationYear,
        publisher: data.publisher ?? existingBook.publisher,
        authors: data.authors ?? existingBook.authors,
        createdAt: existingBook.createdAt,
        updatedAt: new Date(),
      },
      existingBook.id,
    );
    const updatedBook = await this.bookRepository.update(id, newBook);
    return this.outputMapper(updatedBook);
  }

  private outputMapper(book: Book): UpdateBookOutput {
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
