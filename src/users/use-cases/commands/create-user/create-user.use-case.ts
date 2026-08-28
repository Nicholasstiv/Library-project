import { Injectable } from '@nestjs/common';
import {
  CreateUserInput,
  CreateUserOutput,
  ICreateUserUseCase,
} from './Icreate-user.use-case';
import { User } from '@/users/domain/entities/user.entity';
import { IUserRepository } from '@/users/domain/repositories/IUserRepository';
import { IPasswordHasher } from '@/shared/domain/cryptography/IPasswordHasher.repository';

@Injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async execute(data: CreateUserInput): Promise<CreateUserOutput> {
    const hashedPassword = await this.passwordHasher.hash(data.password);

    const user = new User({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const createdUser = await this.userRepository.create(user);

    return this.outputMapper(createdUser);
  }

  private outputMapper(user: User): CreateUserOutput {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
