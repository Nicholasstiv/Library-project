export interface IDeleteAuthorUseCase {
  execute(id: string): Promise<boolean>;
}
