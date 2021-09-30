import winston from 'winston';

import ILogger from '../ILogger';

const { combine, timestamp, label, printf } = winston.format;
const logFormat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] ${level}: ${message}`;
});

class Logger implements ILogger {
	log(filePath: string): winston.Logger {
		const logger = winston.createLogger({
			level: 'silly',
			transports: [
				new winston.transports.Console(),
				new winston.transports.File({
					filename: filePath,
				}),
			],
			format: combine(label({ label: 'my-bank-api' }), timestamp(), logFormat),
		});

		return logger;
	}
}

export { Logger };
