import { container } from "tsyringe";

import IAccountRepository from "@modules/accounts/repositories/IAccountsRepository";
import { AccountsRepository } from "@modules/accounts/infra/filejson/repositories/AccountsRepository";

container.registerSingleton<IAccountRepository>(
  "AccountsRepository",
  AccountsRepository
);
