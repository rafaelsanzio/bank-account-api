import { AccountsRepositoryInMemory } from '@modules/accounts/repositories/in-memory/AccountsRepositoryInMemory';
import AppError from '@shared/errors/AppError';

import { Logger } from '@shared/infra/log/implementation/Logger';

import { TransferAccountsUseCase } from './TransferAccountsUseCase';

let transferAccountsUseCase: TransferAccountsUseCase;
let accountsRepositoryInMemory: AccountsRepositoryInMemory;
let loggerTest: Logger;

describe('Transfer Accounts', () => {
	beforeEach(() => {
		loggerTest = new Logger();
		const logInMemory = loggerTest.log(
			'./src/shared/infra/log/bank-accounts-api-test.log',
		);

		accountsRepositoryInMemory = new AccountsRepositoryInMemory();
		transferAccountsUseCase = new TransferAccountsUseCase(
			accountsRepositoryInMemory,
			logInMemory,
		);
	});

	test('should be able to transfer between accounts', async () => {
		const accountOne = await accountsRepositoryInMemory.create({
			name: 'Account One',
			number: 12345,
			balance: 100,
		});

		const accountTwo = await accountsRepositoryInMemory.create({
			name: 'Account Two',
			number: 123456,
			balance: 2000,
		});

		const account = await transferAccountsUseCase.execute({
			to: accountOne.number,
			from: accountTwo.number,
			value: 100,
		});

		const expectAccount = {
			...accountOne,
			balance: 0,
		};

		expect(account).toEqual(expectAccount);
	});

	test('should not be able to transfer between accounts that accounts does not exist', async () => {
		const accountFrom = await accountsRepositoryInMemory.create({
			name: 'Account From',
			number: 123456,
			balance: 2000,
		});

		await expect(
			transferAccountsUseCase.execute({
				to: 1010101010,
				from: accountFrom.number,
				value: 100,
			}),
		).rejects.toEqual(new AppError('Account does not exist!'));

		const accountTo = await accountsRepositoryInMemory.create({
			name: 'Account To',
			number: 123456,
			balance: 2000,
		});

		await expect(
			transferAccountsUseCase.execute({
				to: accountTo.number,
				from: 1010101010,
				value: 100,
			}),
		).rejects.toEqual(new AppError('Account does not exist!'));
	});

	test('should not be able to transfer between accounts that to account does not have balance', async () => {
		const accountTo = await accountsRepositoryInMemory.create({
			name: 'Account to',
			number: 123456,
			balance: 2000,
		});

		const accountFrom = await accountsRepositoryInMemory.create({
			name: 'Account from',
			number: 123456,
			balance: 1000,
		});

		await expect(
			transferAccountsUseCase.execute({
				to: accountTo.number,
				from: accountFrom.number,
				value: 2500,
			}),
		).rejects.toEqual(new AppError('Account with Insufficient Funds!'));
	});
});
