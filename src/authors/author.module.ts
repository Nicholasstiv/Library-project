import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { AuthorController } from './presenters/http/controllers/author.controller';
import { IAuthorRepository } from './domain/repositories/IAuthor.repository';
import { PrismaAuthorRepository } from './infra/database/prisma/prisma-authors.repository';
import {
  CreateAuthorUseCase,
  DeleteAuthorUseCase,
  UpdateAuthorUseCase,
} from './use-cases/commands';
import { FindAllUseCase, FindByIdUseCase } from './use-cases/queries';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthorController],
  providers: [
    {
      provide: IAuthorRepository,
      useClass: PrismaAuthorRepository,
    },
    CreateAuthorUseCase,
    UpdateAuthorUseCase,
    DeleteAuthorUseCase,
    FindByIdUseCase,
    FindAllUseCase,
  ],
  exports: [IAuthorRepository],
})
export class AuthorModule {}
