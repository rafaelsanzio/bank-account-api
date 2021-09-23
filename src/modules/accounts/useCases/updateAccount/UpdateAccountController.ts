import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { UpdateAccountUseCase } from './UpdateAccountUseCase';

class UpdateAccountController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { name, balance } = request.body;

		const updateAccountUseCase = container.resolve(UpdateAccountUseCase);

		const account = await updateAccountUseCase.execute({
			id,
			name,
			balance,
		});

		return response.status(200).json(account);
	}
}

export { UpdateAccountController };
