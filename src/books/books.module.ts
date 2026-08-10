import { Module } from '@nestjs/common';
import { BooksController } from './presenters/http/controllers/books.controller';
import { AuthorModule } from '@/authors/author.module';
import { IBookRepository } from './domain/repositories/IBooksRepository';
import { PrismaBookRepository } from './infra/database/prisma/prisma-books.repository';
import {
  CreateBookUseCase,
  DeleteBookUseCase,
  UpdateBookUseCase,
} from './use-cases/commands';
import {
  FindAllUseCase,
  FindByAuthorUseCase,
  FindByIdUseCase,
} from './use-cases/queries';

@Module({
  imports: [AuthorModule],
  providers: [
    {
      provide: IBookRepository,
      useClass: PrismaBookRepository,
    },
    CreateBookUseCase,
    UpdateBookUseCase,
    DeleteBookUseCase,
    FindByIdUseCase,
    FindByAuthorUseCase,
    FindAllUseCase,
  ],
  controllers: [BooksController],
})
export class BooksModule {}
