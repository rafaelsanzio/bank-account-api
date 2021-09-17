import { v4 as uuidv4 } from "uuid";

import logger from "@utils/logger";
import JSONFile from "@utils/file";
import IJSONFile from "@utils/interfaces/IJSONFile";
import IAccountJSONFileDTO from "@utils/dtos/IAccountJSONFileDTO";

import IAccountDTO from "@modules/accounts/dtos/IAccountDTO";
import IAccountRepository from "@modules/accounts/repositories/IAccountsRepository";

import AppError from "@shared/errors/AppError";

import Account from "../model/Account";

class AccountsRepository implements IAccountRepository {
  private repository: IJSONFile;

  constructor() {
    this.repository = new JSONFile();
  }

  async create(data: IAccountDTO): Promise<Account> {
    const id = uuidv4();
    const { name, number, balance } = data;
    const account = { id, name, number, balance };

    await this.repository.writeJSONFile(account);

    return account;
  }

  async list(): Promise<Account[]> {
    const accounts = this.repository.readJSONFile();

    return accounts;
  }

  async get(id: string): Promise<Account | undefined> {
    const accounts = await this.repository.readJSONFile();

    const account = accounts.find((account) => account.id === id);

    return account;
  }

  async delete(id: string): Promise<Account | undefined> {
    let accounts = await this.repository.readJSONFile();

    const accountDeleted = accounts.find((account) => account.id === id);
    if (!accountDeleted) {
      logger.error(`DELETE /accounts:${id} - Not Found`);
      throw new AppError("Account does not find");
    }

    accounts = accounts.filter((account) => account.id !== id);

    const accountsToSave: IAccountJSONFileDTO[] = { ...accounts };

    await this.repository.writeJSONFile(accountsToSave);
    logger.info(`DELETE /accounts - ${JSON.stringify(accountsToSave)}`);

    return accountDeleted;
  }

  async update(id: string, data: IAccountDTO): Promise<Account | undefined> {
    const { name, number, balance } = data;
    let accounts = await this.repository.readJSONFile();

    const accountIndex = accounts.findIndex((account) => account.id === id);
    if (accountIndex === -1) {
      logger.error(`PUT /accounts:${id} - Not Found`);
      throw new AppError("Account does not find");
    }

    accounts[accountIndex] = { id, name, number, balance };

    this.repository.writeJSONFile(accounts);
    logger.info(`PUT /accounts - ${JSON.stringify(accounts[accountIndex])}`);

    return accounts[accountIndex];
  }

  async findByNumber(number: number): Promise<Account | undefined> {
    const accounts = await this.repository.readJSONFile();

    const account = accounts.find((account) => account.number === number);
    if (!account) {
      logger.error(`GET /accounts/find-by-number:${number} - Not Found`);
      throw new AppError("Account does not find");
    }

    logger.info(
      `GET /accounts/find-by-number:${number} - ${JSON.stringify(account)}`
    );
    return account;
  }
}

export { AccountsRepository };
