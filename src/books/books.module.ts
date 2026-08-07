import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { AuthorModule } from '@/authors/author.module';

@Module({
  imports: [AuthorModule],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}
