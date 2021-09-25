import { Transaction } from '../types/TransactionModel';

export default interface ITransactionAccountDTO {
	number: number;
	value: number;
	type: Transaction;
}
