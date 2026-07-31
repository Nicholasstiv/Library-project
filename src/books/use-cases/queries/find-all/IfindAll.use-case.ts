import { BookAuthor } from '@/books/domain/entities/book.entity';

export interface FindAllInput {
  limit?: number;
  cursor?: string;
}

export interface BookItem {
  id: string;
  title: string;
  description: string;
  publisher: string;
  publicationYear: number;
  authors: BookAuthor[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FindAllOutput {
  data: BookItem[];
  nextCursor: string | null;
  hasNextPage: boolean;
}

export interface IFindAllUseCase {
  execute(data: FindAllInput): Promise<FindAllOutput>;
}
