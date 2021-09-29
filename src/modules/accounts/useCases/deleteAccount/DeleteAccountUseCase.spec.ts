import { AccountsRepositoryInMemory } from '@modules/accounts/repositories/in-memory/AccountsRepositoryInMemory';
import AppError from '@shared/errors/AppError';

import { CreateAccountUseCase } from '../createAccount/CreateAccountUseCase';
import { DeleteAccountUseCase } from './DeleteAccountUseCase';

let deleteAccountUseCase: DeleteAccountUseCase;
let createAccountUseCase: CreateAccountUseCase;
let accountsRepositoryInMemory: AccountsRepositoryInMemory;

describe('Create Car', () => {
	beforeEach(() => {
		accountsRepositoryInMemory = new AccountsRepositoryInMemory();
		deleteAccountUseCase = new DeleteAccountUseCase(accountsRepositoryInMemory);
		createAccountUseCase = new CreateAccountUseCase(accountsRepositoryInMemory);
	});

	test('should be able to delete an account', async () => {
		const account = await createAccountUseCase.execute({
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
