import { TokenPayload } from './TokenPayload.interface';

export abstract class ITokenService {
  abstract generate(payload: TokenPayload): string;
  abstract verify(token: string): TokenPayload;
}
