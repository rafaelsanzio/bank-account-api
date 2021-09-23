import Account from '../infra/filejson/model/Account';
import IAccountDTO from '../dtos/IAccountDTO';
import IUpdateAccountDTO from '../dtos/IUpdateAccountDTO';

export default interface IAccountRepository {
	create(data: IAccountDTO): Promise<Account>;
	list(): Promise<Account[]>;
	get(id: string): Promise<Account | undefined>;
	delete(id: string): Promise<Account | undefined>;
	update(id: string, data: IUpdateAccountDTO): Promise<Account | undefined>;
	findByNumber(number: number): Promise<Account | undefined>;
}
