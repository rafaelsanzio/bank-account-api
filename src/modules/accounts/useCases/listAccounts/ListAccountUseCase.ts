import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";

import logger from "@utils/logger";

import Account from "@modules/accounts/infra/filejson/model/Account";
import IAccountRepository from "@modules/accounts/repositories/IAccountsRepository";

@injectable()
export class ListAccountUseCase {
  constructor(
    @inject("IAccountRepository")
    private accountRepository: IAccountRepository
  ) {}
  async execute(): Promise<Account[]> {
    const accounts = await this.accountRepository.list();

    logger.info(`LIST /accounts - ${JSON.stringify(accounts)}`);

    return accounts;
  }
}
