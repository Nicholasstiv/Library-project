import { ITokenService } from '@/shared/domain/jwt/ITokenService.repository';
import { UsersModule } from '@/users/users.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenService } from './infra/jwt/jwt-token.repository';
import { LoginUseCase } from './use-cases/commands';
import { AuthController } from './presenters/http/controllers/auth.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    { provide: ITokenService, useClass: JwtTokenService },
    LoginUseCase,
  ],
})
export class AuthModule {}
