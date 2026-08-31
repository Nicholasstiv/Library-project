import { Injectable, NotFoundException } from '@nestjs/common';
import {
  IUpdateUserUseCase,
  UpdateUserInput,
  UpdateUserOutput,
} from './Iupdate-user.use-case';
import { IUserRepository } from '@/users/domain/repositories/IUserRepository';
import { IPasswordHasher } from '@/shared/domain/cryptography/IPasswordHasher.repository';
import { User } from '@/users/domain/entities/user.entity';

@Injectable()
export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async execute(data: UpdateUserInput): Promise<UpdateUserOutput> {
    const existingUser = await this.userRepository.findById(data.id);

    if (!existingUser) throw new NotFoundException('User not found!');

    const password = data.password
      ? await this.passwordHasher.hash(data.password)
      : existingUser.password;

    const newUser = new User(
      {
        name: data.name ?? existingUser.name,
        email: data.email ?? existingUser.email,
        password: password,
        role: data.role ?? existingUser.role,
        createdAt: existingUser.createdAt,
        updatedAt: new Date(),
      },
      existingUser.id,
    );

    const updatedUser = await this.userRepository.update(newUser);

    return this.outputMapper(updatedUser);
  }

  private outputMapper(user: User): UpdateUserOutput {
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
