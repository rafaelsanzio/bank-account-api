import Account from "../infra/filejson/model/Account";
import IAccountDTO from "../dtos/IAccountDTO";

export default interface IAccountRepository {
  create(data: IAccountDTO): Promise<Account>;
  list(): Promise<Account[]>;
  get(id: string): Promise<Account | undefined>;
  delete(id: string): Promise<Account | undefined>;
  update(id: string, data: IAccountDTO): Promise<Account | undefined>;
  findByNumber(number: number): Promise<Account | undefined>;
}
