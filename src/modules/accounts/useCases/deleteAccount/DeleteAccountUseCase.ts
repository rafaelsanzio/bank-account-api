import winston from 'winston';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAccountRepository from '@modules/accounts/repositories/IAccountsRepository';

@injectable()
export class DeleteAccountUseCase {
	constructor(
		@inject('IAccountRepository')
		private accountRepository: IAccountRepository,
		private log: winston.Logger,
	) {}
	async execute(id: string): Promise<void> {
		const accountExists = await this.accountRepository.get(id);

		if (!accountExists) {
			this.log.error(`DELETE /accounts:${id} - Account ${id} does not found`);
			throw new AppError('Account does not exist!');
		}

		await this.accountRepository.delete(id);
		this.log.info(`DELETE /accounts/${id} - ${JSON.stringify(accountExists)}`);
	}
}
