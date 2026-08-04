import { Injectable, NotFoundException } from '@nestjs/common';
import { IDeleteAuthorUseCase } from './Idelete-author.use-case';
import { IAuthorRepository } from '@/authors/domain/repositories/IAuthor.repository';

@Injectable()
export class DeleteAuthorUseCase implements IDeleteAuthorUseCase {
  constructor(private readonly authorRepository: IAuthorRepository) {}

  async execute(id: string): Promise<boolean> {
    const deleted = await this.authorRepository.delete(id);

    if (!deleted) throw new NotFoundException('Author not found!');

    return true;
  }
}
