import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { IUserRepository } from './domain/repositories/IUserRepository';
import { PrismaUserRepository } from './infra/database/prisma/prisma-user.repository';
import { IPasswordHasher } from '@/shared/domain/cryptography/IPasswordHasher.repository';
import { BcryptPasswordHasher } from '@/shared/infra/cryptography/bcrypt-password-hasher.repository';
import { CreateUserUseCase } from './use-cases/commands/create-user/create-user.use-case';
import { UpdateUserUseCase } from './use-cases/commands/update-user/update-user.use-case';
import { DeleteUserUseCase } from './use-cases/commands/delete-user/delete-user.use-case';
import { FindUserByIdUseCase } from './use-cases/queries/findById/find-user-by-id.use-case';
import { FindUserByEmailUseCase } from './use-cases/queries/findByEmail/find-user-by-email';
import { FindAllUsersUseCase } from './use-cases/queries';
import { UsersController } from './presenters/http/controllers/users.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    { provide: IUserRepository, useClass: PrismaUserRepository },
    { provide: IPasswordHasher, useClass: BcryptPasswordHasher },
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    FindUserByIdUseCase,
    FindUserByEmailUseCase,
    FindAllUsersUseCase,
  ],
})
export class UsersModule {}
