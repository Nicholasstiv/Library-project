import { Author } from '../entities/author.entity';

export abstract class IAuthorRepository {
  abstract create(data: Author): Promise<Author>;
  abstract update(data: Author): Promise<Author>;
  abstract delete(id: string): Promise<boolean>;
  abstract findById(id: string): Promise<Author | null>;
  abstract findByIds(
    ids: string[],
  ): Promise<{ id: string; firstName: string; lastName: string }[]>; // Evita ter que alterar o mapper
  abstract findAll(limit: number, cursor?: string): Promise<Author[]>;
}
