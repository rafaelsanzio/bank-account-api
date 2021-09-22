/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
import { pathsToModuleNameMapper } from 'ts-jest/utils';

import { compilerOptions } from './tsconfig.json';

// eslint-disable-next-line no-undef
module.exports = {
	roots: ['<rootDir>/src'],
	collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
	coverageDirectory: 'coverage',
	testEnvironment: 'node',
	transform: {
		'.+\\.ts$': 'ts-jest',
	},
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: '<rootDir>/src/',
	}),
};
