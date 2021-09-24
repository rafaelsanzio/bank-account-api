/* eslint-disable @typescript-eslint/ban-types */
import { container } from 'tsyringe';
import { Request, Response } from 'express';

import IQueryParamsAccountDTO from '@modules/accounts/dtos/IQueryParamsAccountDTO';

import { ListAccountUseCase } from './ListAccountUseCase';

class ListAccountController {
	async handle(
		request: Request<{}, {}, {}, IQueryParamsAccountDTO>,
		response: Response,
	): Promise<Response> {
		const { name } = request.query as IQueryParamsAccountDTO;
		const listAccountUseCase = container.resolve(ListAccountUseCase);

		const account = await listAccountUseCase.execute({ name });

		return response.status(201).json(account);
	}
}

export { ListAccountController };
