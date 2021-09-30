import winston from 'winston';

export default interface ILogger {
	log(filePath: string): winston.Logger;
}
