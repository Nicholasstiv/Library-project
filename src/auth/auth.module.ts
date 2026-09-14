import { ITokenService } from '@/shared/domain/jwt/ITokenService.repository';
import { UsersModule } from '@/users/users.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenService } from './infra/jwt/jwt-token.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule,
  ],
  providers: [{ provide: ITokenService, useClass: JwtTokenService }],
})
export class AuthModule {}
