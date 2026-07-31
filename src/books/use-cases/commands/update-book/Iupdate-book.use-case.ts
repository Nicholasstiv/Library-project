import { BookAuthor } from '../../../domain/entities/book.entity';

export interface UpdateBookInput {
  title?: string;
  description?: string;
  publisher?: string;
  publicationYear?: number;
  authors?: BookAuthor[];
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
  execute(id: string, data: UpdateBookInput): Promise<UpdateBookOutput>;
}
