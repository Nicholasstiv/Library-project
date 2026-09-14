import { Injectable } from '@nestjs/common';
import { ILoginUseCase, LoginInput, LoginOutput } from './Ilogin.use-case';
import { IUserRepository } from '@/users/domain/repositories/IUserRepository';
import { IPasswordHasher } from '@/shared/domain/cryptography/IPasswordHasher.repository';
import { ITokenService } from '@/shared/domain/jwt/ITokenService.repository';
import { InvalidCredentialsException } from '@/auth/domain/exceptions/InvalidCredentials.exception';

@Injectable()
export class LoginUseCase implements ILoginUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly tokenService: ITokenService,
  ) {}

  async execute(data: LoginInput): Promise<LoginOutput> {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) throw new InvalidCredentialsException();

    const passwordMatches = await this.passwordHasher.compare(
      data.password,
      user.password,
    );

    if (!passwordMatches) throw new InvalidCredentialsException();

    const accessToken = this.tokenService.generate({
      sub: user.id,
      role: user.role,
    });

    return {
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
