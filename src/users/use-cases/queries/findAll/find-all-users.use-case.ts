import { Injectable } from '@nestjs/common';
import {
  FindAllUsersInput,
  FindAllUsersOutput,
  IFindAllUsersUseCase,
} from './Ifind-all-users.use-case';
import { IUserRepository } from '@/users/domain/repositories/IUserRepository';
import { User } from '@/users/domain/entities/user.entity';

@Injectable()
export class FindAllUsersUseCase implements IFindAllUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: FindAllUsersInput): Promise<FindAllUsersOutput[]> {
    return this.outputMapper(await this.userRepository.findAll(data.role));
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
