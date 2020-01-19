
import Transport from 'winston-transport';
import { LogService } from './app/services/log.service';

export class WinstonTransportSequelize extends Transport {

  private sub: any;
  constructor(public options: any) {
    super(options);
  }

  log(info: any, callback: any): any {
    const message = info.message;
    LogService.init().next(message).then(() => callback());
  }

  close(): void {
    LogService.init().unsubscribe(this.sub);
  }

}
