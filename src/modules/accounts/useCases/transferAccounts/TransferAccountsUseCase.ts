/* eslint-disable no-case-declarations */
import winston from 'winston';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAccountRepository from '@modules/accounts/repositories/IAccountsRepository';
import ITransferAccountDTO from '@modules/accounts/dtos/ITransferAccountDTO';
import Account from '@modules/accounts/infra/filejson/model/Account';

@injectable()
export class TransferAccountsUseCase {
	constructor(
		@inject('IAccountRepository')
		private accountRepository: IAccountRepository,
		private log: winston.Logger,
	) {}
	async execute({ to, from, value }: ITransferAccountDTO): Promise<Account> {
		const accountToExists = await this.accountRepository.findByNumber(to);
		if (!accountToExists) {
			this.log.error(`POST /accounts/transfer - Account ${to} does not exist!`);
			throw new AppError('Account does not exist!');
		}

		const accountFromExists = await this.accountRepository.findByNumber(from);
		if (!accountFromExists) {
			this.log.error(
				`POST /accounts/transfer - Account ${from} does not exist!`,
			);
			throw new AppError('Account does not exist!');
		}

		if (accountToExists.balance <= 0 || accountToExists.balance < value) {
			this.log.error(
				`POST /accounts/transfer - Account ${to} with Insufficient Funds!`,
			);
			throw new AppError('Account with Insufficient Funds!');
		}

		const account = await this.accountRepository.transfer({ to, from, value });
		this.log.info(
			`POST /accounts/transfer - ${JSON.stringify({ to, from, value })}`,
		);

		return account;
	}
}
