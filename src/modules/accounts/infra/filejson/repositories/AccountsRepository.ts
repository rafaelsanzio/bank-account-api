import { v4 as uuidv4 } from 'uuid';

import IJSONFile from '@modules/accounts/dtos/IJSONFile';

import IAccountDTO from '@modules/accounts/dtos/IAccountDTO';
import IAccountRepository from '@modules/accounts/repositories/IAccountsRepository';

import IQueryParamsAccountDTO from '@modules/accounts/dtos/IQueryParamsAccountDTO';
import ITransactionAccountDTO from '@modules/accounts/dtos/ITransactionAccountDTO';

import { Credit, Debit } from '@modules/accounts/types/TransactionModel';
import ITransferAccountDTO from '@modules/accounts/dtos/ITransferAccountDTO';
import IAccountJSONFileDTO from '@modules/accounts/dtos/IAccountJSONFileDTO';

import JSONFile from '../model/file';
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

	async list({ name }: IQueryParamsAccountDTO): Promise<Account[]> {
		let accounts = await this.repository.readJSONFile();

		if (name) {
			accounts = accounts.filter((account) => account.name.includes(name));
		}

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

		await this.repository.writeJSONFile(accounts);

		return accounts[accountIndex];
	}

	async findByNumber(number: number): Promise<Account | undefined> {
		const accounts = await this.repository.readJSONFile();

		const account = accounts.find((account) => account.number === number);

		return account;
	}

	async transaction({
		number,
		value,
		type,
	}: ITransactionAccountDTO): Promise<Account> {
		const accounts = await this.repository.readJSONFile();

		const accountIndex = accounts.findIndex(
			(account) => account.number === number,
		);

		// eslint-disable-next-line default-case
		switch (type) {
			case Credit:
				accounts[accountIndex].balance += value;
				break;
			case Debit:
				accounts[accountIndex].balance -= value;
				break;
		}

		await this.repository.writeJSONFile(accounts);

		return accounts[accountIndex];
	}

	async transfer({ to, from, value }: ITransferAccountDTO): Promise<Account> {
		const accounts = await this.repository.readJSONFile();

		const accountToIndex = accounts.findIndex(
			(account) => account.number === to,
		);
		const accountFromIndex = accounts.findIndex(
			(account) => account.number === from,
		);

		accounts[accountToIndex].balance -= value;
		accounts[accountFromIndex].balance += value;

		await this.repository.writeJSONFile(accounts);

		return accounts[accountToIndex];
	}
}

export { AccountsRepository };
