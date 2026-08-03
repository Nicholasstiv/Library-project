import { Injectable } from '@nestjs/common';
import {
  CreateAuthorInput,
  CreateAuthorOutput,
  ICreateAuthorUseCase,
} from './IcreateAuthor.use-case';
import { IAuthorRepository } from '@/authors/domain/repositories/IAuthor.repository';
import { Author } from '@/authors/domain/entities/author.entity';

@Injectable()
export class CreateAuthorUseCase implements ICreateAuthorUseCase {
  constructor(private readonly authorRepository: IAuthorRepository) {}

  async execute(data: CreateAuthorInput): Promise<CreateAuthorOutput> {
    const author = new Author({
      firstName: data.firstName,
      lastName: data.lastName,
      books: [],
    });

    const createdAuthor = await this.authorRepository.create(author);

    return this.outputMapper(createdAuthor);
  }

  private outputMapper(author: Author): CreateAuthorOutput {
    return {
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
      books: author.books,
    };
  }
}
