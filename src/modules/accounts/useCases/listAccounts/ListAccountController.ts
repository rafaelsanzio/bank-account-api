import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { ListAccountUseCase } from './ListAccountUseCase';

class ListAccountController {
	async handle(request: Request, response: Response): Promise<Response> {
		const listAccountUseCase = container.resolve(ListAccountUseCase);

		const account = await listAccountUseCase.execute();

		return response.status(201).json(account);
	}
}

export { ListAccountController };
