import Transport from 'winston-transport';
import { Subscription, Subject, Observable } from 'rxjs';

export class WinstonTransportSequelize extends Transport {

  private sub!: Subscription;
  constructor(public options: any) {
    super(options);
  }

  log(info: any, callback: any): any {
    const message = info.message;
    this.sub = LogService.init().getData().subscribe((sqlMessage: any) => {

      console.log(message);
      console.log(sqlMessage);

      callback();
    });
  }

  close(): void {
    if (this.sub) { this.sub.unsubscribe(); }
  }

}

import { format } from 'date-fns';
import fs = require('fs');
import appRoot from 'app-root-path';

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
