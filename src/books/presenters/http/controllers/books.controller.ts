import {
  CreateBookUseCase,
  DeleteBookUseCase,
  UpdateBookUseCase,
} from '@/books/use-cases/commands';
import {
  FindAllUseCase,
  FindByAuthorUseCase,
  FindByIdUseCase,
} from '@/books/use-cases/queries';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { FindAllBooksDto } from '../dto/find-all-books.dto';

@Controller('books')
export class BooksController {
  constructor(
    private readonly createBook: CreateBookUseCase,
    private readonly updateBook: UpdateBookUseCase,
    private readonly deleteBook: DeleteBookUseCase,
    private readonly findById: FindByIdUseCase,
    private readonly findByAuthor: FindByAuthorUseCase,
    private readonly findAll: FindAllUseCase,
  ) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.createBook.execute(createBookDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.updateBook.execute({ id, ...updateBookDto });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteBook.execute(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findById.execute(id);
  }

  @Get('author/:authorId')
  listByAuthor(@Param('authorId') authorId: string) {
    return this.findByAuthor.execute(authorId);
  }

  @Get()
  listAll(@Query() query: FindAllBooksDto) {
    return this.findAll.execute(query);
  }
}
