import winston from 'winston';

const { combine, timestamp, label, printf } = winston.format;
const logFormat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
	level: 'silly',
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'bank-accounts-api.log' }),
	],
	format: combine(label({ label: 'my-bank-api' }), timestamp(), logFormat),
});

export default logger;
