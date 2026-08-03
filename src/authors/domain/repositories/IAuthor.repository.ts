import { Author } from '../entities/author.entity';

export abstract class IAuthorRepository {
  abstract create(data: Author): Promise<Author>;
  abstract update(data: Author): Promise<Author>;
  abstract findById(id: string): Promise<Author | null>;
  abstract findAll(limit: number, cursor?: string): Promise<Author[]>;
}
