import { AccountsRepositoryInMemory } from '@modules/accounts/repositories/in-memory/AccountsRepositoryInMemory';
import AppError from '@shared/errors/AppError';

import { CreateAccountUseCase } from './CreateAccountUseCase';

let createAccountUseCase: CreateAccountUseCase;
let accountsRepositoryInMemory: AccountsRepositoryInMemory;

describe('Create Account', () => {
	beforeEach(() => {
		accountsRepositoryInMemory = new AccountsRepositoryInMemory();
		createAccountUseCase = new CreateAccountUseCase(accountsRepositoryInMemory);
	});

	test('should be able to create a new account', async () => {
		const account = await createAccountUseCase.execute({
			name: 'Any Account',
			number: 123456,
			balance: 90,
		});

		expect(account).toHaveProperty('id');
	});

	test('should not able to create a new account with same number', async () => {
		await createAccountUseCase.execute({
			name: 'Any Account',
			number: 123456,
			balance: 90,
		});

		await expect(
			createAccountUseCase.execute({
				name: 'Any Account 2',
				number: 123456,
				balance: 190,
			}),
		).rejects.toEqual(new AppError('Account already exist!'));
	});
});
