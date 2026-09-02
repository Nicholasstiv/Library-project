import { IUserRepository } from '@/users/domain/repositories/IUserRepository';
import {
  FindUserByEmailOutput,
  IFindUserByEmail,
} from './Ifind-user-by-email.use-case';
import { NotFoundException } from '@nestjs/common';
import { User } from '@/users/domain/entities/user.entity';

export class FindUserByEmail implements IFindUserByEmail {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(email: string): Promise<FindUserByEmailOutput> {
    const found = await this.userRepository.findByEmail(email);
    if (!found) throw new NotFoundException('User not found!');

    return this.outputMapper(found);
  }

  private outputMapper(user: User): FindUserByEmailOutput {
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
