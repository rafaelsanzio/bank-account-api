import { container } from "tsyringe";
import { Request, Response } from "express";

import { CreateAccountUseCase } from "./CreateAccountUseCase";

class CreateAccountController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, number, balance } = request.body;

    const createAccountUseCase = container.resolve(CreateAccountUseCase);

    const account = await createAccountUseCase.execute({
      name,
      number,
      balance,
    });

    return response.status(201).json(account);
  }
}

export { CreateAccountController };
