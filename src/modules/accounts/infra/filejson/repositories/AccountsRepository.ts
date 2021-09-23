import { v4 as uuidv4 } from 'uuid';

import logger from '@utils/logger';
import JSONFile from '@utils/file';
import IJSONFile from '@utils/interfaces/IJSONFile';
import IAccountJSONFileDTO from '@utils/dtos/IAccountJSONFileDTO';

import IAccountDTO from '@modules/accounts/dtos/IAccountDTO';
import IAccountRepository from '@modules/accounts/repositories/IAccountsRepository';

import Account from '../model/Account';

class AccountsRepository implements IAccountRepository {
	private repository: IJSONFile;

	constructor() {
		this.repository = new JSONFile();
	}

	async create(data: IAccountDTO): Promise<Account> {
		const id = uuidv4();
		const { name, number, balance } = data;
		const account = { id, name, number, balance };

		await this.repository.writeJSONFile(account);

		return account;
	}

	async list(): Promise<Account[]> {
		const accounts = this.repository.readJSONFile();

		return accounts;
	}

	async get(id: string): Promise<Account | undefined> {
		const accounts = await this.repository.readJSONFile();

		const account = accounts.find((account) => account.id === id);

		return account;
	}

	async delete(id: string): Promise<Account | undefined> {
		let accounts = await this.repository.readJSONFile();

		const accountDeleted = accounts.find((account) => account.id === id);
		if (!accountDeleted) {
			return undefined;
		}

		accounts = accounts.filter((account) => account.id !== id);

		const accountsToSave: IAccountJSONFileDTO[] = { ...accounts };

		await this.repository.writeJSONFile(accountsToSave);

		return accountDeleted;
	}

	async update(id: string, data: IAccountDTO): Promise<Account | undefined> {
		const { name, number, balance } = data;

		const accounts = await this.repository.readJSONFile();

		const accountIndex = accounts.findIndex((account) => account.id === id);
		if (accountIndex === -1) {
			return undefined;
		}

		accounts[accountIndex] = { id, name, number, balance };

		this.repository.writeJSONFile(accounts);

		return accounts[accountIndex];
	}

	async findByNumber(number: number): Promise<Account | undefined> {
		const accounts = await this.repository.readJSONFile();

		const account = accounts.find((account) => account.number === number);

		return account;
	}
}

export { AccountsRepository };
