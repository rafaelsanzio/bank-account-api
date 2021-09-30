import AppError from '@shared/errors/AppError';

import { AccountsRepositoryInMemory } from '@modules/accounts/repositories/in-memory/AccountsRepositoryInMemory';

import { Logger } from '@shared/infra/log/implementation/Logger';

import { DeleteAccountUseCase } from './DeleteAccountUseCase';

let deleteAccountUseCase: DeleteAccountUseCase;
let accountsRepositoryInMemory: AccountsRepositoryInMemory;
let loggerTest: Logger;

describe('Delete Account', () => {
	beforeEach(() => {
		loggerTest = new Logger();
		const logInMemory = loggerTest.log(
			'./src/shared/infra/log/bank-accounts-api-test.log',
		);

		accountsRepositoryInMemory = new AccountsRepositoryInMemory();
		deleteAccountUseCase = new DeleteAccountUseCase(
			accountsRepositoryInMemory,
			logInMemory,
		);
	});

	test('should be able to delete an account', async () => {
		const account = await accountsRepositoryInMemory.create({
			name: 'Any Account',
			number: 123456,
			balance: 90,
		});

		expect(await deleteAccountUseCase.execute(account.id)).toBeUndefined();
	});

	test('should not able to delete an account that does not exist', async () => {
		await expect(deleteAccountUseCase.execute('123456789')).rejects.toEqual(
			new AppError('Account does not exist!'),
		);
	});
});
