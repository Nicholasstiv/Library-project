export abstract class IPasswordHasher {
  abstract hash(text: string): Promise<string>;
  abstract compare(text: string, hashedText: string): Promise<boolean>;
}
