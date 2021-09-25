import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { TransactionAccountUseCase } from './TransactionAccountUseCase';

class TransactionAccountController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { number, value, type } = request.body;

		const transactionAccountUseCase = container.resolve(
			TransactionAccountUseCase,
		);

		const account = await transactionAccountUseCase.execute({
			number,
			value,
			type,
		});

		return response.status(201).json(account);
	}
}

export { TransactionAccountController };
