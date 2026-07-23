import { Injectable } from '@nestjs/common';
import { Book } from './interfaces/book.interface';

@Injectable()
export class BooksService {
  private readonly books: Book[] = [];

  create(book: Book): Book {
    this.books.push(book);
    return book;
  }

  findAll(): Book[] {
    return this.books;
  }
}
