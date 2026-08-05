import { AuthorBook } from '@/authors/domain/entities/author.entity';

export interface FindByIdOutput {
  id: string;
  firstName: string;
  lastName: string;
  books: AuthorBook[];
}

export interface IFindByIdUseCase {
  execute(id: string): Promise<FindByIdOutput>;
}
