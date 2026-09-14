export class InvalidCredentialsException extends Error {
  constructor() {
    super('Invalid Email or Password');
    this.name = 'InvalidCredentialsException';
  }
}
