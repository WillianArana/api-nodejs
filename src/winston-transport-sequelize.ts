
import Transport from 'winston-transport';
import { LogService } from './app/services/log.service';

export class WinstonTransportSequelize extends Transport {

  private logService!: LogService;
  constructor(public options: any) {
    super(options);
    this.logService = LogService.init();
  }

  log(info: any, callback: any): any {
    if (this.logService) {
      this.logService.notify(info);
    }
  }

}
