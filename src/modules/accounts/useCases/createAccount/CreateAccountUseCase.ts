import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IAccountRepository from '@modules/accounts/repositories/IAccountsRepository';
import logger from '@shared/infra/log/logger';

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
	) {}
	async execute({ name, number, balance }: IRequest): Promise<void> {
		const accountAlreadyExists = await this.accountRepository.findByNumber(
			number,
		);

		if (accountAlreadyExists) {
			logger.error(`POST /accounts - Account ${number} already exists!`);
			throw new AppError('Account already exist!');
		}

		await this.accountRepository.create({ name, number, balance });
		logger.info(
			`POST /accounts - ${JSON.stringify({ name, number, balance })}`,
		);
	}
}
