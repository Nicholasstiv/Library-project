import {
  CreateAuthorUseCase,
  DeleteAuthorUseCase,
  UpdateAuthorUseCase,
} from '@/authors/use-cases/commands';
import { FindAllUseCase, FindByIdUseCase } from '@/authors/use-cases/queries';
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
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { FindAllAuthorsDto } from '../dto/find-all-authors.dto';

@Controller('authors')
export class AuthorController {
  constructor(
    private readonly createAuthor: CreateAuthorUseCase,
    private readonly updateAuthor: UpdateAuthorUseCase,
    private readonly deleteAuthor: DeleteAuthorUseCase,
    private readonly findById: FindByIdUseCase,
    private readonly findAllAuthors: FindAllUseCase,
  ) {}

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.createAuthor.execute(createAuthorDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.updateAuthor.execute({ id, ...updateAuthorDto });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteAuthor.execute(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findById.execute(id);
  }

  @Get()
  findAll(@Query('cursor') query: FindAllAuthorsDto) {
    return this.findAllAuthors.execute(query);
  }
}
