
import Transport from 'winston-transport';
import { LogService } from './app/services/log.service';
import { Subscription } from 'rxjs';

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
