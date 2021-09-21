import Account from '@modules/accounts/infra/filejson/model/Account';
import IAccountJSONFileDTO from '@utils/dtos/IAccountJSONFileDTO';

export default interface IJSONFile {
	readJSONFile(): Promise<Account[]>;
	writeJSONFile(
		data: IAccountJSONFileDTO | IAccountJSONFileDTO[],
	): Promise<void>;
}
