/* eslint-disable no-case-declarations */
import { inject, injectable } from 'tsyringe';

import logger from '@utils/logger';
import AppError from '@shared/errors/AppError';

import IAccountRepository from '@modules/accounts/repositories/IAccountsRepository';
import ITransferAccountDTO from '@modules/accounts/dtos/ITransferAccountDTO';

@injectable()
export class TransferAccountsUseCase {
	constructor(
		@inject('IAccountRepository')
		private accountRepository: IAccountRepository,
	) {}
	async execute({ to, from, value }: ITransferAccountDTO): Promise<void> {
		const accountToExists = await this.accountRepository.findByNumber(to);
		if (!accountToExists) {
			logger.error(`POST /accounts/transfer - Account ${to} does not exist!`);
			throw new AppError('Account does not exist!');
		}

		const accountFromExists = await this.accountRepository.findByNumber(to);
		if (!accountFromExists) {
			logger.error(`POST /accounts/transfer - Account ${from} does not exist!`);
			throw new AppError('Account does not exist!');
		}

		if (accountToExists.balance <= 0 || accountToExists.balance < value) {
			logger.error(
				`POST /accounts/transfer - Account ${to} with Insufficient Funds!`,
			);
			throw new AppError('Account with Insufficient Funds!');
		}

		await this.accountRepository.transfer({ to, from, value });
		logger.info(
			`POST /accounts/transfer - ${JSON.stringify({ to, from, value })}`,
		);
	}
}
