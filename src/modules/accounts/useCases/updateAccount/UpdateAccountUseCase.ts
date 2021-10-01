import winston from 'winston';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAccountRepository from '@modules/accounts/repositories/IAccountsRepository';
import Account from '@modules/accounts/infra/filejson/model/Account';

interface IRequest {
	id: string;
	name: string;
	balance: number;
}

@injectable()
export class UpdateAccountUseCase {
	constructor(
		@inject('IAccountRepository')
		private accountRepository: IAccountRepository,
		private log: winston.Logger,
	) {}
	async execute({ id, name, balance }: IRequest): Promise<Account | undefined> {
		const accountToUpdate = await this.accountRepository.get(id);

		if (!accountToUpdate) {
			this.log.error(`PUT /accounts/${id} - Account ${id} does not exist!`);
			throw new AppError('Account does not exist!');
		}

		const account = await this.accountRepository.update(id, { name, balance });
		this.log.info(`PUT /accounts/${id} - ${JSON.stringify(accountToUpdate)}`);

		return account;
	}
}
