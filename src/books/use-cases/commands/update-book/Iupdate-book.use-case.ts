import { BookAuthor } from '../../../domain/entities/book.entity';

export interface UpdateBookInput {
  id: string;
  title?: string;
  description?: string;
  publisher?: string;
  publicationYear?: number;
  authors?: string[];
}

export interface UpdateBookOutput {
  id: string;
  title: string;
  description: string;
  publisher: string;
  publicationYear: number;
  authors: BookAuthor[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IUpdateBookUseCase {
  execute(data: UpdateBookInput): Promise<UpdateBookOutput>;
}
