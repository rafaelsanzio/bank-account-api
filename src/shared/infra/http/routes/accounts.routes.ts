import { Router } from 'express';

import { GetAccountController } from '@modules/accounts/useCases/getAccount/GetAccountController';
import { ListAccountController } from '@modules/accounts/useCases/listAccounts/ListAccountController';
import { CreateAccountController } from '@modules/accounts/useCases/createAccount/CreateAccountController';
import { DeleteAccountController } from '@modules/accounts/useCases/deleteAccount/DeleteAccountController';
import { UpdateAccountController } from '@modules/accounts/useCases/updateAccount/UpdateAccountController';
import { TransactionAccountController } from '@modules/accounts/useCases/transactionsInAccount/TransactionAccountController';
import { TransferAccountsController } from '@modules/accounts/useCases/transferAccounts/TransferAccountsController';

import { AccountValidator } from '../validators/accounts.validator';

const accountsRouter = Router();

const accountsValidator = new AccountValidator();

const createAccountController = new CreateAccountController();
const getAccountController = new GetAccountController();
const listAccountsController = new ListAccountController();
const deleteAccountController = new DeleteAccountController();
const updateAccountController = new UpdateAccountController();
const transactionAccountController = new TransactionAccountController();
const transferAccountsController = new TransferAccountsController();

accountsRouter.post(
	'/',
	accountsValidator.post,
	createAccountController.handle,
);
accountsRouter.get('/', accountsValidator.list, listAccountsController.handle);
accountsRouter.get('/:id', accountsValidator.get, getAccountController.handle);
accountsRouter.delete(
	'/:id',
	accountsValidator.delete,
	deleteAccountController.handle,
);
accountsRouter.put(
	'/:id',
	accountsValidator.put,
	updateAccountController.handle,
);
accountsRouter.post(
	'/transaction',
	accountsValidator.transaction,
	transactionAccountController.handle,
);
accountsRouter.post(
	'/transfer',
	accountsValidator.transfer,
	transferAccountsController.handle,
);

export default accountsRouter;
