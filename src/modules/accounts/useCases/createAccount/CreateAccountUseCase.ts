import winston from 'winston';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAccountRepository from '@modules/accounts/repositories/IAccountsRepository';

import Account from '@modules/accounts/infra/filejson/model/Account';

interface IRequest {
	name: string;
	number: number;
	balance: number;
}

@injectable()
export class CreateAccountUseCase {
	constructor(
		@inject('IAccountRepository')
		private accountRepository: IAccountRepository,
		private log: winston.Logger,
	) {}
	async execute({ name, number, balance }: IRequest): Promise<Account> {
		const accountAlreadyExists = await this.accountRepository.findByNumber(
			number,
		);

		if (accountAlreadyExists) {
			this.log.error(`POST /accounts - Account ${number} already exists!`);
			throw new AppError('Account already exist!');
		}

		const account = await this.accountRepository.create({
			name,
			number,
			balance,
		});
		this.log.info(
			`POST /accounts - ${JSON.stringify({ name, number, balance })}`,
		);

		return account;
	}
}
