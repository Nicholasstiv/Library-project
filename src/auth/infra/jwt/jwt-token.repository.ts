import { ITokenService } from '@/shared/domain/jwt/ITokenService.repository';
import { TokenPayload } from '@/shared/domain/jwt/TokenPayload.interface';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService implements ITokenService {
  constructor(private readonly jwtService: JwtService) {}

  generate(payload: TokenPayload): string {
    return this.jwtService.sign(payload);
  }

  verify(token: string): TokenPayload {
    return this.jwtService.verify<TokenPayload>(token);
  }
}
