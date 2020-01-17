import { IService } from '../interfaces/iservice';
// import { sequelize } from '../../sequelize';
// import LogModel from '../models/log.model';
import { Observable } from '../shared/observable';

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

  private static logSevice: LogService;

  private readonly observer!: Observable;
  private constructor() {
    this.observer = new Observable();
    this.observer.subscribe((msg: any) => {
      console.log(msg);
    });
  }

  notify(data: any): void {
    // logStream.write(` ${format(new Date(), 'dd/MM/yyyy HH:mm:ss:SSSS')} -> ${data}, \n`);
    this.observer.notify(data);
  }

}
