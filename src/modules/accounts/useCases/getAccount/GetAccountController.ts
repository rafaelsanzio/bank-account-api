import { container } from "tsyringe";
import { Request, Response } from "express";

import { GetAccountUseCase } from "./GetAccountUseCase";

class GetAccountController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getAccountUseCase = container.resolve(GetAccountUseCase);

    const account = await getAccountUseCase.execute(id);

    return response.status(201).json(account);
  }
}

export { GetAccountController };
