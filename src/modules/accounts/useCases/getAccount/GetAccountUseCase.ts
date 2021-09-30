import winston from 'winston';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Account from '@modules/accounts/infra/filejson/model/Account';
import IAccountRepository from '@modules/accounts/repositories/IAccountsRepository';

@injectable()
export class GetAccountUseCase {
	constructor(
		@inject('IAccountRepository')
		private accountRepository: IAccountRepository,
		private log: winston.Logger,
	) {}
	async execute(id: string): Promise<Account | undefined> {
		const account = await this.accountRepository.get(id);
		if (!account) {
			this.log.error(`GET /accounts:${id} - Not Found`);
			throw new AppError('Account does not found!');
		}

		this.log.info(`GET /accounts:id - ${JSON.stringify(account)}`);
		return account;
	}
}
