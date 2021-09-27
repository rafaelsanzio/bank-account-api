import { inject, injectable } from 'tsyringe';

import logger from '@shared/infra/log/logger';

import Account from '@modules/accounts/infra/filejson/model/Account';
import IAccountRepository from '@modules/accounts/repositories/IAccountsRepository';
import IQueryParamsAccountDTO from '@modules/accounts/dtos/IQueryParamsAccountDTO';

@injectable()
export class ListAccountUseCase {
	constructor(
		@inject('IAccountRepository')
		private accountRepository: IAccountRepository,
	) {}
	async execute(params: IQueryParamsAccountDTO): Promise<Account[]> {
		const accounts = await this.accountRepository.list(params);

		logger.info(`LIST /accounts - ${JSON.stringify(accounts)}`);

		return accounts;
	}
}
