import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import logger from '@shared/infra/log/logger';

import IAccountRepository from '@modules/accounts/repositories/IAccountsRepository';

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
	) {}
	async execute({ id, name, balance }: IRequest): Promise<void> {
		const accountToUpdate = await this.accountRepository.get(id);

		if (!accountToUpdate) {
			logger.error(`PUT /accounts/${id} - Account ${id} does not exist!`);
			throw new AppError('Account does not exist!');
		}

		await this.accountRepository.update(id, { name, balance });
		logger.info(`PUT /accounts/${id} - ${JSON.stringify(accountToUpdate)}`);
	}
}
