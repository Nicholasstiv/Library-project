import { LoginUseCase } from '@/auth/use-cases/commands/login/login.use-case';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.loginUseCase.execute(loginDto);
  }
}
