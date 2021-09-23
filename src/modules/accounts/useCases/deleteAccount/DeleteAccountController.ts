import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { DeleteAccountUseCase } from './DeleteAccountUseCase';

class DeleteAccountController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const deleteAccountUseCase = container.resolve(DeleteAccountUseCase);

		await deleteAccountUseCase.execute(id);

		return response.status(204);
	}
}

export { DeleteAccountController };
