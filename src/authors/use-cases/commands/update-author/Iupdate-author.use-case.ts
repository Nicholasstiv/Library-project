import { AuthorBook } from '@/authors/domain/entities/author.entity';

export interface UpdateAuthorInput {
  id: string;
  firstName?: string;
  lastName?: string;
}

export interface UpdateAuthorOutput {
  id: string;
  firstName: string;
  lastName: string;
  books: AuthorBook[];
}

export interface IUpdateAuthorUseCase {
  execute(data: UpdateAuthorInput): Promise<UpdateAuthorOutput>;
}
