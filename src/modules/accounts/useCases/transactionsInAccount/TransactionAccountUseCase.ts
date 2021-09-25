/* eslint-disable no-case-declarations */
import { inject, injectable } from 'tsyringe';

import logger from '@utils/logger';
import AppError from '@shared/errors/AppError';
import IAccountRepository from '@modules/accounts/repositories/IAccountsRepository';
import ITransactionAccountDTO from '@modules/accounts/dtos/ITransactionAccountDTO';

import { Credit, Debit } from '@modules/accounts/types/TransactionModel';
import Account from '@modules/accounts/infra/filejson/model/Account';

@injectable()
export class TransactionAccountUseCase {
	constructor(
		@inject('IAccountRepository')
		private accountRepository: IAccountRepository,
	) {}
	async execute({
		number,
		value,
		type,
	}: ITransactionAccountDTO): Promise<Account | undefined> {
		const accountExists = await this.accountRepository.findByNumber(number);

		if (!accountExists) {
			logger.error(
				`POST /accounts/transaction - Account ${number} does not exist!`,
			);
			throw new AppError('Account does not exist!');
		}

		// eslint-disable-next-line default-case
		switch (type) {
			case Credit:
				await this.accountRepository.transaction({
					number,
					value,
					type: Credit,
				});
				break;
			case Debit:
				if (accountExists.balance <= 0 || accountExists.balance < value) {
					logger.error(
						`POST /accounts/transaction - Account ${number} with Insufficient Funds!`,
					);
					throw new AppError('Account with Insufficient Funds!');
				}
				await this.accountRepository.transaction({
					number,
					value,
					type: Debit,
				});
		}

		const account = this.accountRepository.findByNumber(number);
		logger.info(`POST /accounts/transaction - ${JSON.stringify(account)}`);
		return account;
	}
}
