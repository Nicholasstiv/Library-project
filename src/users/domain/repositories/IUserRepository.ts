import { User } from '../entities/user.entity';

export abstract class IUserRepository {
  abstract create(data: User): Promise<User>;
  abstract update(data: User): Promise<User>;
  abstract delete(id: string): Promise<boolean>;
  abstract findOne(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findAll(role?: string): Promise<User[]>;
}
