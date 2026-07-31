import { BookAuthor } from '@/books/domain/entities/book.entity';

export interface FindByIdOutput {
  id: string;
  title: string;
  description: string;
  publisher: string;
  publicationYear: number;
  authors: BookAuthor[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IFindByIdUseCase {
  execute(id: string): Promise<FindByIdOutput>;
}
