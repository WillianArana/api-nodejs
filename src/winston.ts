import appRoot from 'app-root-path';
import winston from 'winston';
import { format } from 'date-fns';
import { logger, errorLogger } from 'express-winston';
import { WinstonTransportSequelize } from './app/shared/log';

//#region Opções de configuraçao do log
const logOptions = {
  fileApp: {
    level: 'info',
    filename: `${appRoot}/src/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  fileError: {
    level: 'error',
    filename: `${appRoot}/src/logs/error.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    dumpExceptions: true,
    showStack: true,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
  saveLog: {
    level: 'info',
    handleExceptions: true,
    colorize: false,
  },
};
//#endregion

export function configLog(): any {
  return logger({
    transports: [
      new WinstonTransportSequelize(logOptions.saveLog),
      new winston.transports.File(logOptions.fileApp),
      new winston.transports.Console(logOptions.console),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json(),
    ),
    meta: true,
    msg: (req, res: any) => {
      return `status: ${res.statusCode} - ${req.method} - url:${req.url} - ${req.ip} - ${format(new Date(), 'dd/MM/yyyy HH:mm:ss')}`;
    },
    expressFormat: false,
    colorize: false,
    ignoreRoute: (req, res) => false,
  });
}

export function configLogError(): any {
  return errorLogger({
    transports: [
      new winston.transports.File(logOptions.fileError),
      new winston.transports.Console(),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json(),
    ),
  });
}
