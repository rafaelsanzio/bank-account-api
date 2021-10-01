import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';

import IAccountDTO from '@modules/accounts/dtos/IAccountDTO';
import IQueryParamsAccountDTO from '@modules/accounts/dtos/IQueryParamsAccountDTO';
import ITransactionAccountDTO from '@modules/accounts/dtos/ITransactionAccountDTO';
import ITransferAccountDTO from '@modules/accounts/dtos/ITransferAccountDTO';
import Account from '@modules/accounts/infra/filejson/model/Account';
import { Credit, Debit } from '@modules/accounts/types/TransactionModel';

import IAccountsRepository from '../IAccountsRepository';

class AccountsRepositoryInMemory implements IAccountsRepository {
	accounts: Account[] = [];

	async create({ name, number, balance }: IAccountDTO): Promise<Account> {
		const account = new Account();

		Object.assign(account, {
			id: uuidv4(),
			name,
			number,
			balance,
		});

		this.accounts.push(account);

		return account;
	}

	async list({ name }: IQueryParamsAccountDTO): Promise<Account[]> {
		if (name) {
			this.accounts = this.accounts.filter((account) =>
				account.name.includes(name),
			);
		}

		return this.accounts;
	}

	async get(id: string): Promise<Account | undefined> {
		const account = this.accounts.find((account) => account.id === id);

		return account;
	}

	async delete(id: string): Promise<Account | undefined> {
		const accountDeleted = this.accounts.find((account) => account.id === id);
		if (!accountDeleted) {
			return undefined;
		}

		this.accounts = this.accounts.filter((account) => account.id !== id);

		return accountDeleted;
	}

	async update(id: string, data: IAccountDTO): Promise<Account | undefined> {
		const { name, balance } = data;

		const accountIndex = this.accounts.findIndex(
			(account) => account.id === id,
		);
		if (accountIndex === -1) {
			return undefined;
		}

		this.accounts[accountIndex] = {
			id,
			name,
			balance,
			number: this.accounts[accountIndex].number,
		};

		return this.accounts[accountIndex];
	}

	async findByNumber(number: number): Promise<Account | undefined> {
		const account = this.accounts.find((account) => account.number === number);

		return account;
	}

	async transaction({
		number,
		value,
		type,
	}: ITransactionAccountDTO): Promise<Account> {
		const accountIndex = this.accounts.findIndex(
			(account) => account.number === number,
		);

		// eslint-disable-next-line default-case
		switch (type) {
			case Credit:
				this.accounts[accountIndex].balance += value;
				break;
			case Debit:
				this.accounts[accountIndex].balance -= value;
				break;
		}

		return this.accounts[accountIndex];
	}

	async transfer({ to, from, value }: ITransferAccountDTO): Promise<void> {
		const accountToIndex = this.accounts.findIndex(
			(account) => account.number === to,
		);
		const accountFromIndex = this.accounts.findIndex(
			(account) => account.number === from,
		);

		this.accounts[accountToIndex].balance -= value;
		this.accounts[accountFromIndex].balance += value;
	}
}

export { AccountsRepositoryInMemory };
