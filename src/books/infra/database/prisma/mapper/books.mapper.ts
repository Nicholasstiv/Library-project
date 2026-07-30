import { Prisma } from '@/database/prisma/client';
import { Book } from '@/books/domain/entities/book.entity';

type PrismaBookWithAuthors = Prisma.BookGetPayload<{
  include: { authors: true };
}>;

export class BookMapper {
  static toDomain(raw: PrismaBookWithAuthors): Book {
    return new Book(
      {
        title: raw.title,
        description: raw.description,
        publicationYear: raw.publicationYear,
        publisher: raw.publisher,
        authors: raw.authors.map((author) => ({
          id: author.id,
          firstName: author.firstName,
          lastName: author.lastName,
        })),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }

  static toPersistance(book: Book) {
    return {
      id: book.id,
      title: book.title,
      description: book.description,
      publicationYear: book.publicationYear,
      publisher: book.publisher,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
    };
  }
}
