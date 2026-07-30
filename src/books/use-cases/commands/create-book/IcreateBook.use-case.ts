import { BookAuthor } from '../../../domain/entities/book.entity';

export interface CreateBookInput {
  title: string;
  description: string;
  publisher: string;
  publicationYear: number;
  authors: BookAuthor[];
}

export interface CreateBookOutput {
  id: string;
  title: string;
  description: string;
  publisher: string;
  publicationYear: number;
  authors: BookAuthor[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateBookUseCase {
  execute(data: CreateBookInput): Promise<CreateBookOutput>;
}
