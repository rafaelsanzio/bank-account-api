import fs from 'fs';

import { accountFileJson } from '@utils/enum';
import IJSONFile from './interfaces/IJSONFile';
import IAccountJSONFileDTO from './dtos/IAccountJSONFileDTO';
import Account from '@modules/accounts/infra/filejson/model/Account';

class JSONFile implements IJSONFile {
	async readJSONFile(): Promise<Account[]> {
		const data = fs.readFileSync(accountFileJson, 'utf-8');
		const json: Account[] = JSON.parse(data);

		return json;
	}

	async writeJSONFile(
		json: IAccountJSONFileDTO | IAccountJSONFileDTO[],
	): Promise<void> {
		fs.writeFileSync(accountFileJson, JSON.stringify(json));
	}
}

export default JSONFile;
