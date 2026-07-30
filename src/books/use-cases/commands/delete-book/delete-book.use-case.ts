import { Injectable, NotFoundException } from '@nestjs/common';
import { IdeleteBookUseCase } from './Idelete-book.use-case';
import { IBookRepository } from '@/books/domain/repositories/IBooksRepository';

@Injectable()
export class DeleteBookUseCase implements IdeleteBookUseCase {
  constructor(private readonly bookRepository: IBookRepository) {}

  async execute(id: string): Promise<boolean> {
    const deleted = await this.bookRepository.delete(id);

    if (!deleted) throw new NotFoundException('Book not found!');

    return true;
  }
}
