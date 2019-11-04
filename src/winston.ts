import appRoot from 'app-root-path';
import winston from 'winston';
import { format } from 'date-fns';
import { Application } from 'express';
import { logger } from 'express-winston';

//#region Opções de configuraçao do log
const logOptions = {
  file: {
    level: 'info',
    filename: `${appRoot}/src/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};
//#endregion

export class Winston {
  public static configLog(app: Application) {
    app.use(logger({
      transports: [
        new winston.transports.File(logOptions.file),
        new winston.transports.Console(logOptions.console),
      ],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json(),
      ),
      meta: true,
      msg: (req, res: any) => {

        return `${res.statusCode} - ${res.responseTime}ms - ${req.url} - ${req.method} -
         ${req.ip} - ${format(new Date(), "yyyy-MM-dd'T'HH:mm:ss")}`;
      },
      expressFormat: false,
      colorize: false,
      ignoreRoute: (req, res) => false,
    }));
  }
}
