import {
  CreateUserUseCase,
  DeleteUserUseCase,
  UpdateUserUseCase,
} from '@/users/use-cases/commands';
import {
  FindAllUsersUseCase,
  FindUserByEmailUseCase,
  FindUserByIdUseCase,
} from '@/users/use-cases/queries';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { FindByEmailDto } from '../dto/find-by-email.dto';
import { FindAllUsersDto } from '../dto/find-all-users.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly deleteUser: DeleteUserUseCase,
    private readonly findById: FindUserByIdUseCase,
    private readonly findByEmail: FindUserByEmailUseCase,
    private readonly findAllUsers: FindAllUsersUseCase,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUser.execute(createUserDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUser.execute({ id, ...updateUserDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteUser.execute(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findById.execute(id);
  }

  @Get()
  findEmail(@Query() query: FindByEmailDto) {
    return this.findByEmail.execute(query.email);
  }

  @Get()
  findAll(@Query() query: FindAllUsersDto) {
    return this.findAllUsers.execute(query);
  }
}
