import winston from 'winston';
import { inject, injectable } from 'tsyringe';

import Account from '@modules/accounts/infra/filejson/model/Account';
import IAccountRepository from '@modules/accounts/repositories/IAccountsRepository';
import IQueryParamsAccountDTO from '@modules/accounts/dtos/IQueryParamsAccountDTO';

@injectable()
export class ListAccountUseCase {
	constructor(
		@inject('IAccountRepository')
		private accountRepository: IAccountRepository,
		private log: winston.Logger,
	) {}
	async execute(params: IQueryParamsAccountDTO): Promise<Account[]> {
		const accounts = await this.accountRepository.list(params);

		this.log.info(`LIST /accounts - ${JSON.stringify(accounts)}`);

		return accounts;
	}
}
