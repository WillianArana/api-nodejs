import Transport from 'winston-transport';
import { Subject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

export class WinstonTransportSequelize extends Transport {

  constructor(public options: any, private repo: any = getRepository(LogModel)) {
    super(options);
  }

  log(info: any, callback: any): any {
    const request = info.message;
    LogService.init().getData().pipe(take(1)).subscribe(async (command: any) => {

      const log = {
        idUsuario: 0,
        request,
        command,
      } as LogModel;

      await this.repo.create(log);
      callback();
    });
  }

}

import { format } from 'date-fns';
import fs = require('fs');
import appRoot from 'app-root-path';
import { getRepository } from './repository';
import LogModel from '../models/log.model';

const logStream = fs.createWriteStream(`${appRoot}/src/logs/sql.log`, { flags: 'a' });

export class LogService {

  static init(): LogService {
    if (!!!this.logSevice) {
      this.logSevice = new LogService();
    }
    return this.logSevice;
  }
  private readonly subject!: Subject<any>;
  private static logSevice: LogService;
  private constructor() {
    this.subject = new Subject<any>();
  }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }

  notify(data: any): void {
    logStream.write(` ${format(new Date(), 'dd/MM/yyyy HH:mm:ss:SSSS')} -> ${data}, \n`);
    this.subject.next(data);
  }
}
