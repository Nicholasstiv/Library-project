export interface IdeleteBookUseCase {
  execute(id: string): Promise<boolean>;
}
