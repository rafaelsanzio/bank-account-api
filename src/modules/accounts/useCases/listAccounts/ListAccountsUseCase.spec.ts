import { AccountsRepositoryInMemory } from '@modules/accounts/repositories/in-memory/AccountsRepositoryInMemory';

import { Logger } from '@shared/infra/log/implementation/Logger';

import IQueryParamsAccountDTO from '@modules/accounts/dtos/IQueryParamsAccountDTO';
import { ListAccountUseCase } from './ListAccountUseCase';

let listAccountsUseCase: ListAccountUseCase;
let accountsRepositoryInMemory: AccountsRepositoryInMemory;
let loggerTest: Logger;

describe('List Accounts', () => {
	beforeEach(() => {
		loggerTest = new Logger();
		const logInMemory = loggerTest.log(
			'./src/shared/infra/log/bank-accounts-api-test.log',
		);

		accountsRepositoryInMemory = new AccountsRepositoryInMemory();
		listAccountsUseCase = new ListAccountUseCase(
			accountsRepositoryInMemory,
			logInMemory,
		);
	});

	test('should be able to list accounts', async () => {
		await accountsRepositoryInMemory.create({
			name: 'List Account',
			number: 12345,
			balance: 100,
		});

		const params: IQueryParamsAccountDTO = { name: undefined };

		const listAccounts = await listAccountsUseCase.execute(params);
		expect(listAccounts.length).toBeGreaterThan(0);
	});

	test('should be able to list accounts with filter', async () => {
		await accountsRepositoryInMemory.create({
			name: 'List Account',
			number: 12345,
			balance: 100,
		});
		await accountsRepositoryInMemory.create({
			name: 'Another Account',
			number: 123456,
			balance: 1000,
		});

		const params: IQueryParamsAccountDTO = { name: 'Another' };

		const listAccounts = await listAccountsUseCase.execute(params);
		expect(listAccounts.length).toBe(1);
	});
});
