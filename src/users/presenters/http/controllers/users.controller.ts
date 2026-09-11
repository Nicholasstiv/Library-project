import {
  CreateUserUseCase,
  DeleteUserUseCase,
  UpdateUserUseCase,
} from '@/users/use-cases/commands';
import {
  FindUserByEmailUseCase,
  FindUserByIdUseCase,
} from '@/users/use-cases/queries';
import { Controller } from '@nestjs/common';

@Controller('users')
export class UsersControllers {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly deleteUser: DeleteUserUseCase,
    private readonly findById: FindUserByIdUseCase,
    private readonly findByEmail: FindUserByEmailUseCase,
  ) {}
}
