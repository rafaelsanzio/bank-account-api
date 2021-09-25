import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { TransferAccountsUseCase } from './TransferAccountsUseCase';

class TransferAccountsController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { to, from, value } = request.body;

		const transferAccountsUseCase = container.resolve(TransferAccountsUseCase);

		const account = await transferAccountsUseCase.execute({
			to,
			from,
			value,
		});

		return response.status(201).json(account);
	}
}

export { TransferAccountsController };
