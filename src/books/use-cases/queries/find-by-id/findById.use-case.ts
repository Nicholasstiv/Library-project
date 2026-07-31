import { Injectable, NotFoundException } from '@nestjs/common';
import { FindByIdOutput, IFindByIdUseCase } from './IfindById.use-case';
import { IBookRepository } from '@/books/domain/repositories/IBooksRepository';
import { Book } from '@/books/domain/entities/book.entity';

@Injectable()
export class FindByIdUseCase implements IFindByIdUseCase {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(id: string): Promise<FindByIdOutput> {
    const found = await this.bookRepository.findById(id);

    if (!found) throw new NotFoundException('Book not found!');
    return this.outputMapper(found);
  }

  private outputMapper(book: Book): FindByIdOutput {
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
