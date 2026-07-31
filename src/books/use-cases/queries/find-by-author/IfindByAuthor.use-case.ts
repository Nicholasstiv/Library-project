import { BookAuthor } from '@/books/domain/entities/book.entity';

export interface FindByAuthorOutput {
  id: string;
  title: string;
  description: string;
  publisher: string;
  publicationYear: number;
  authors: BookAuthor[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IFindByAuthorUseCase {
  execute(authorId: string): Promise<FindByAuthorOutput[]>;
}
