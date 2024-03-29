import 'reflect-metadata';
import 'express-async-errors';
import '@shared/container';

import express from 'express';
import cors from 'cors';

import { promises } from 'fs';

import { accountFileJson } from '@shared/infra/database/json/enum';
import { router } from './routes';

const fs = promises;
const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.listen(3000, async () => {
	try {
		await fs.readFile(accountFileJson, 'utf-8');
	} catch (err) {
		const initalJson = {
			accounts: [],
		};
		fs.writeFile(accountFileJson, JSON.stringify(initalJson)).catch((err) => {
			console.error(err);
		});
	}
	console.log('Server is running on port 3000');
});
