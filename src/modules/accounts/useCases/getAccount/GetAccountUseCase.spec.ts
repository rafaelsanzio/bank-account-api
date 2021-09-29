import { AccountsRepositoryInMemory } from '@modules/accounts/repositories/in-memory/AccountsRepositoryInMemory';
import AppError from '@shared/errors/AppError';

import { GetAccountUseCase } from './GetAccountUseCase';

let getAccountUseCase: GetAccountUseCase;
let accountsRepositoryInMemory: AccountsRepositoryInMemory;

describe('Get Account', () => {
	beforeEach(() => {
		accountsRepositoryInMemory = new AccountsRepositoryInMemory();
		getAccountUseCase = new GetAccountUseCase(accountsRepositoryInMemory);
	});

	it('should be able to get an account', async () => {
		const account = await accountsRepositoryInMemory.create({
			name: 'Get Account',
			number: 12345,
			balance: 100,
		});

		const getAccount = await getAccountUseCase.execute(account.id);
		expect(getAccount).toEqual(account);
	});

	test('should not able to get an account that does not found', async () => {
		await expect(getAccountUseCase.execute('123456789')).rejects.toEqual(
			new AppError('Account does not found!'),
		);
	});
});
