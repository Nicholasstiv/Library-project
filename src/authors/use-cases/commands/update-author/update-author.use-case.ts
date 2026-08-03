import { Injectable, NotFoundException } from '@nestjs/common';
import {
  IUpdateAuthorUseCase,
  UpdateAuthorInput,
  UpdateAuthorOutput,
} from './Iupdate-author.use-case';
import { IAuthorRepository } from '@/authors/domain/repositories/IAuthor.repository';
import { Author } from '@/authors/domain/entities/author.entity';

@Injectable()
export class UpdateAuthorUseCase implements IUpdateAuthorUseCase {
  constructor(private readonly authorRepository: IAuthorRepository) {}

  async execute(data: UpdateAuthorInput): Promise<UpdateAuthorOutput> {
    const existingAuthor = await this.authorRepository.findById(data.id);
    if (!existingAuthor) throw new NotFoundException('Author not found!');

    const newAuthor = new Author(
      {
        firstName: data.firstName ?? existingAuthor.firstName,
        lastName: data.lastName ?? existingAuthor.lastName,
        books: existingAuthor.books,
      },
      existingAuthor.id,
    );

    const updatedAuthor = await this.authorRepository.update(newAuthor);

    return this.outputMapper(updatedAuthor);
  }

  private outputMapper(author: Author): UpdateAuthorOutput {
    return {
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
      books: author.books,
    };
  }
}
