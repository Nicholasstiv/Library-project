import { AuthorBook } from '@/authors/domain/entities/author.entity';

export interface FindAllInput {
  limit?: number;
  cursor?: string;
}

export interface AuthorItem {
  id: string;
  firstName: string;
  lastName: string;
  books: AuthorBook[];
}

export interface FindAllOutput {
  data: AuthorItem[];
  nextCursor: string | null;
  hasNextPage: boolean;
}

export interface IFindAllUseCase {
  execute(data: FindAllInput): Promise<FindAllOutput>;
}
