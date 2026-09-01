import { Injectable, NotFoundException } from '@nestjs/common';
import { FindUserByIdOutput, IFindUserByIdUseCase } from './Ifind-user-by-id';
import { IUserRepository } from '@/users/domain/repositories/IUserRepository';
import { User } from '@/users/domain/entities/user.entity';

@Injectable()
export class FindUserByIdUseCase implements IFindUserByIdUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<FindUserByIdOutput> {
    const found = await this.userRepository.findById(id);
    if (!found) throw new NotFoundException('User not found!');

    return this.outputMapper(found);
  }

  private outputMapper(user: User): FindUserByIdOutput {
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
