import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IAccountRepository from '@modules/accounts/repositories/IAccountsRepository';
import logger from '@utils/logger';

@injectable()
export class DeleteAccountUseCase {
	constructor(
		@inject('IAccountRepository')
		private accountRepository: IAccountRepository,
	) {}
	async execute(id: string): Promise<void> {
		const accountExists = await this.accountRepository.get(id);

		if (!accountExists) {
			logger.error(`DELETE /accounts:${id} - Account ${id} does not found`);
			throw new AppError('Account does not exist!');
		}

		await this.accountRepository.delete(id);
		logger.info(`DELETE /accounts/${id} - ${JSON.stringify(accountExists)}`);
	}
}
