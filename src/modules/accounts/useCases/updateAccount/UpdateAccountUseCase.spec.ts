import AppError from '@shared/errors/AppError';

import { AccountsRepositoryInMemory } from '@modules/accounts/repositories/in-memory/AccountsRepositoryInMemory';

import { Logger } from '@shared/infra/log/implementation/Logger';

import { UpdateAccountUseCase } from './UpdateAccountUseCase';

let updateAccountUseCase: UpdateAccountUseCase;
let accountsRepositoryInMemory: AccountsRepositoryInMemory;
let loggerTest: Logger;

describe('Update Account', () => {
	beforeEach(() => {
		loggerTest = new Logger();
		const logInMemory = loggerTest.log(
			'./src/shared/infra/log/bank-accounts-api-test.log',
		);

		accountsRepositoryInMemory = new AccountsRepositoryInMemory();
		updateAccountUseCase = new UpdateAccountUseCase(
			accountsRepositoryInMemory,
			logInMemory,
		);
	});

	test('should be able to update an Account', async () => {
		const account = await accountsRepositoryInMemory.create({
			name: 'List Account',
			number: 12345,
			balance: 100,
		});

		const updateAccount = await updateAccountUseCase.execute({
			id: account.id,
			name: 'Update Account',
			balance: 99,
		});

		const expectedAccount = {
			id: account.id,
			number: account.number,
			name: 'Update Account',
			balance: 99,
		};

		expect(updateAccount).toEqual(expectedAccount);
	});

	test('should not able to update an account that does not found', async () => {
		await expect(
			updateAccountUseCase.execute({
				id: '123456789',
				name: 'Any Account',
				balance: 100,
			}),
		).rejects.toEqual(new AppError('Account does not exist!'));
	});
});
