import { Injectable } from '@nestjs/common';
import {
  AuthorItem,
  FindAllInput,
  FindAllOutput,
  IFindAllUseCase,
} from './Ifind-all.use-case';
import { IAuthorRepository } from '@/authors/domain/repositories/IAuthor.repository';
import { Author } from '@/authors/domain/entities/author.entity';

@Injectable()
export class FindAllUseCase implements IFindAllUseCase {
  constructor(private readonly authorRepository: IAuthorRepository) {}

  async execute(data: FindAllInput): Promise<FindAllOutput> {
    const limit = Math.min(data.limit ?? 10, 50);

    const authors = await this.authorRepository.findAll(limit, data.cursor);

    const hasNextPage = authors.length > limit;
    const slice = hasNextPage ? authors.slice(0, limit) : authors;
    const nextCursor = hasNextPage ? slice[slice.length - 1].id : null;

    return {
      data: slice.map((author) => this.outputMapper(author)),
      nextCursor,
      hasNextPage,
    };
  }

  private outputMapper(author: Author): AuthorItem {
    return {
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
      books: author.books,
    };
  }
}
