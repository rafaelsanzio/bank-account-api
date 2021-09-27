import fs from 'fs';

import { accountFileJson } from '@shared/infra/database/json/enum';
import Account from '@modules/accounts/infra/filejson/model/Account';

import IJSONFile from '@modules/accounts/dtos/IJSONFile';
import IAccountJSONFileDTO from '@modules/accounts/dtos/IAccountJSONFileDTO';

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
