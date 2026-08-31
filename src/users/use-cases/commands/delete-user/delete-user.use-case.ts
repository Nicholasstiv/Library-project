import { Injectable, NotFoundException } from '@nestjs/common';
import { IDeleteUserUseCase } from './Idelete-user.use-case';
import { IUserRepository } from '@/users/domain/repositories/IUserRepository';

@Injectable()
export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<boolean> {
    const deleted = await this.userRepository.delete(id);

    if (!deleted) throw new NotFoundException('User not found!');

    return true;
  }
}
