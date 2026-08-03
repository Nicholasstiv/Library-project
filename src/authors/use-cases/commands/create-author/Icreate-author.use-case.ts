import { AuthorBook } from '@/authors/domain/entities/author.entity';

export interface CreateAuthorInput {
  firstName: string;
  lastName: string;
}

export interface CreateAuthorOutput {
  id: string;
  firstName: string;
  lastName: string;
  books: AuthorBook[];
}

export interface ICreateAuthorUseCase {
  execute(data: CreateAuthorInput): Promise<CreateAuthorOutput>;
}
