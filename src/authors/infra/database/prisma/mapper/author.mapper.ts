import { Author } from '@/authors/domain/entities/author.entity';
import { Prisma } from '@/database/prisma/client';

type PrismaAuthorWithBooks = Prisma.AuthorGetPayload<{
  include: { books: true };
}>;

export class AuthorMapper {
  static toDomain(raw: PrismaAuthorWithBooks): Author {
    return new Author(
      {
        firstName: raw.firstName,
        lastName: raw.lastName,
        books: raw.books.map((book) => ({
          id: book.id,
          title: book.title,
          description: book.description,
          publisher: book.publisher,
          publicationYear: book.publicationYear,
        })),
      },
      raw.id,
    );
  }

  static toPersistence(author: Author) {
    return {
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
    };
  }
}
