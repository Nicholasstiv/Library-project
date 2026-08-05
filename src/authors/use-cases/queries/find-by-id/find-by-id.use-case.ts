import { Injectable, NotFoundException } from '@nestjs/common';
import { FindByIdOutput, IFindByIdUseCase } from './Ifind-by-id.use-case';
import { IAuthorRepository } from '@/authors/domain/repositories/IAuthor.repository';
import { Author } from '@/authors/domain/entities/author.entity';

@Injectable()
export class FindByIdUseCase implements IFindByIdUseCase {
  constructor(private readonly authorRepository: IAuthorRepository) {}

  async execute(id: string): Promise<FindByIdOutput> {
    const found = await this.authorRepository.findById(id);

    if (!found) throw new NotFoundException('Author not found!');

    return this.outputMapper(found);
  }

  private outputMapper(author: Author): FindByIdOutput {
    return {
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
      books: author.books,
    };
  }
}
