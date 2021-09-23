import { Router } from 'express';

import { GetAccountController } from '@modules/accounts/useCases/getAccount/GetAccountController';
import { ListAccountController } from '@modules/accounts/useCases/listAccounts/ListAccountController';
import { CreateAccountController } from '@modules/accounts/useCases/createAccount/CreateAccountController';
import { DeleteAccountController } from '@modules/accounts/useCases/deleteAccount/DeleteAccountController';
import { UpdateAccountController } from '@modules/accounts/useCases/updateAccount/UpdateAccountController';

const accountsRouter = Router();

const createAccountController = new CreateAccountController();
const getAccountController = new GetAccountController();
const listAccountsController = new ListAccountController();
const deleteAccountController = new DeleteAccountController();
const updateAccountController = new UpdateAccountController();

accountsRouter.post('/', createAccountController.handle);
accountsRouter.get('/', listAccountsController.handle);
accountsRouter.get('/:id', getAccountController.handle);
accountsRouter.delete('/:id', deleteAccountController.handle);
accountsRouter.put('/:id', updateAccountController.handle);

/*
router.post("/transaction", async (request: Request, response: Response) => {
  try {
    let { id, value } = request.body;
    let data = await fs.readFile(accountFileJson, "utf-8");
    let result = JSON.parse(data);

    id = Number(id);
    value = Number(value);

    const index = result.accounts.findIndex(
      (account: IAccountDTO) => account.id === id
    );
    if (index === -1) {
      logger.error(`POST /accounts/transaction - Not Found`);
      response.status(400).send({ error: "Not Found" });
      return;
    }

    if (value < 0 && result.accounts[index].balance + value < 0) {
      logger.error(`POST /accounts/transaction - Insufficient Funds`);
      throw new Error("Insufficient Funds");
    }

    result.accounts[index].balance += value;

    await fs
      .writeFile(accountFileJson, JSON.stringify(result))
      .then(() => {
        logger.info(
          `POST /accounts/transaction - ${JSON.stringify(
            result.accounts[index]
          )}`
        );
        response.send(result.accounts[index]);
      })
      .catch((err) => {
        logger.error(`POST /accounts/transaction - ${err.message}`);
        response.status(400).send({ error: err.message });
      });
  } catch (err) {
    logger.error(`POST /accounts/transaction - ${err.message}`);
    response.status(400).send({ error: err.message });
  }
});

router.post("/transfer", async (request: Request, response: Response) => {
  try {
    let { to, from, value } = request.body;
    let data = await fs.readFile(accountFileJson, "utf-8");
    let result = JSON.parse(data);

    const toID = Number(to);
    const fromID = Number(from);
    value = Number(value);

    if (value <= 0) {
      logger.error(
        `POST /accounts/transfer - Operation is not valid, negative value to transfer`
      );
      throw new Error("Operation is not valid, negative value to transfer");
    }

    const toIndex = result.accounts.findIndex(
      (account: IAccountDTO) => account.id === toID
    );
    if (toIndex === -1) {
      logger.error(`POST /accounts/transfer - To Account Not Found`);
      response.status(400).send({ error: "To Account Not Found" });
      return;
    }

    const fromIndex = result.accounts.findIndex(
      (account: IAccountDTO) => account.id === fromID
    );
    if (fromIndex === -1) {
      logger.error(`POST /accounts/transfer - From Account Not Found`);
      response.status(400).send({ error: "From Account Not Found" });
      return;
    }

    if (result.accounts[toIndex].balance - value < 0) {
      logger.error(`POST /accounts/transfer - Insufficient Funds`);
      throw new Error("Insufficient Funds");
    }

    result.accounts[toIndex].balance -= value;
    result.accounts[fromIndex].balance += value;

    await fs
      .writeFile(accountFileJson, JSON.stringify(result))
      .then(() => {
        logger.info(
          `POST /accounts/transfer - ${JSON.stringify(
            result.accounts[toIndex]
          )}`
        );
        response.send(result.accounts[toIndex]);
      })
      .catch((err) => {
        logger.error(`POST /accounts/transfer - ${err.message}`);
        response.status(400).send({ error: err.message });
      });
  } catch (err) {
    logger.error(`POST /accounts/transfer - ${err.message}`);
    response.status(400).send({ error: err.message });
  }
}); */

export default accountsRouter;
