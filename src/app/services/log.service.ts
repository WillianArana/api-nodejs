import { IService } from '../interfaces/iservice';
import { Subject, Observable } from 'rxjs';
// import { sequelize } from '../../sequelize';
// import LogModel from '../models/log.model';
// import { sequelize } from '../../sequelize';

// import { format } from 'date-fns';
// import fs = require('fs');
// import appRoot from 'app-root-path';

// const logStream = fs.createWriteStream(`${appRoot}/src/logs/sql.log`, { flags: 'a' });

export class LogService implements IService {
  // private readonly repo = sequelize.getRepository(LogModel);

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

  // logStream.write(` ${format(new Date(), 'dd/MM/yyyy HH:mm:ss:SSSS')} -> ${data}, \n`);

  getData(): Observable<any> {
    return this.subject.asObservable();
  }

  notify(data: any): void {
    this.subject.next(data);
  }

}
