import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { IUserRepository } from './domain/repositories/IUserRepository';
import { PrismaUserRepository } from './infra/database/prisma/prisma-user.repository';
import { IPasswordHasher } from '@/shared/domain/cryptography/IPasswordHasher.repository';
import { BcryptPasswordHasher } from '@/shared/infra/cryptography/bcrypt-password-hasher.repository';
import { CreateUserUseCase } from './use-cases/commands/create-user/create-user.use-case';
import { UpdateUserUseCase } from './use-cases/commands/update-user/update-user.use-case';
import { DeleteUserUseCase } from './use-cases/commands/delete-user/delete-user.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    { provide: IUserRepository, useClass: PrismaUserRepository },
    { provide: IPasswordHasher, useClass: BcryptPasswordHasher },
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
})
export class UsersModule {}
