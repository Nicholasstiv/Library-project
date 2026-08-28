import { IPasswordHasher } from '@/shared/domain/cryptography/IPasswordHasher.repository';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptPasswordHasher implements IPasswordHasher {
  private readonly saltRounds = 10;

  async hash(text: string): Promise<string> {
    return bcrypt.hash(text, this.saltRounds);
  }

  async compare(text: string, hashedText: string): Promise<boolean> {
    return bcrypt.compare(text, hashedText);
  }
}
