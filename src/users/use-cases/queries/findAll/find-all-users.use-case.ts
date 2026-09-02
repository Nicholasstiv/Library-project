import { Injectable } from '@nestjs/common';
import {
  FindAllUsersOutput,
  IFindAllUsersUseCase,
} from './Ifind-all-users.use-case';
import { IUserRepository } from '@/users/domain/repositories/IUserRepository';
import { User, UserRole } from '@/users/domain/entities/user.entity';

@Injectable()
export class FindAllUsersUseCase implements IFindAllUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(role?: UserRole): Promise<FindAllUsersOutput[]> {
    return this.outputMapper(await this.userRepository.findAll(role));
  }

  private outputMapper(users: User[]): FindAllUsersOutput[] {
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }));
  }
}
