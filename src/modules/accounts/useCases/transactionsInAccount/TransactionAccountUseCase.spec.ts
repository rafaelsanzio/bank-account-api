import { AccountsRepositoryInMemory } from '@modules/accounts/repositories/in-memory/AccountsRepositoryInMemory';
import { Credit, Debit } from '@modules/accounts/types/TransactionModel';
import AppError from '@shared/errors/AppError';

import { Logger } from '@shared/infra/log/implementation/Logger';

import { TransactionAccountUseCase } from './TransactionAccountUseCase';

let transactionAccountUseCase: TransactionAccountUseCase;
let accountsRepositoryInMemory: AccountsRepositoryInMemory;
let loggerTest: Logger;

describe('Transaction Account', () => {
	beforeEach(() => {
		loggerTest = new Logger();
		const logInMemory = loggerTest.log(
			'./src/shared/infra/log/bank-accounts-api-test.log',
		);

		accountsRepositoryInMemory = new AccountsRepositoryInMemory();
		transactionAccountUseCase = new TransactionAccountUseCase(
			accountsRepositoryInMemory,
			logInMemory,
		);
	});

	test('should be able to transaction account', async () => {
		const account = await accountsRepositoryInMemory.create({
			name: 'Account One',
			number: 123456,
			balance: 1000,
		});

		let accountWithTransaction = await transactionAccountUseCase.execute({
			number: account.number,
			value: 1000,
			type: Credit,
		});

		const expectAccountCredit = {
			...account,
			balance: 2000,
		};

		expect(accountWithTransaction).toEqual(expectAccountCredit);

		accountWithTransaction = await transactionAccountUseCase.execute({
			number: account.number,
			value: 1000,
			type: Debit,
		});

		const expectAccountDebit = {
			...account,
			balance: 1000,
		};

		expect(accountWithTransaction).toEqual(expectAccountDebit);
	});

	test('should not be able to do a transaction that number does not exist', async () => {
		const account = await accountsRepositoryInMemory.create({
			name: 'Account One',
			number: 123456,
			balance: 1000,
		});

		await expect(
			transactionAccountUseCase.execute({
				number: account.number,
				value: 2000,
				type: Debit,
			}),
		).rejects.toEqual(new AppError('Account with Insufficient Funds!'));
	});

	test('should not be able to do a transaction (Debit) with Insufficient Funds', async () => {
		await expect(
			transactionAccountUseCase.execute({
				number: 1010101010,
				value: 100,
				type: Credit,
			}),
		).rejects.toEqual(new AppError('Account does not exist!'));
	});
});
