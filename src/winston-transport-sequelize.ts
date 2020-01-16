
import Transport from 'winston-transport';

/*

declare namespace TransportStream {
  interface TransportStreamOptions {
    format?: logform.Format;
    level?: string;
    silent?: boolean;
    handleExceptions?: boolean;

    log?(info: any, next: () => void): any;
    logv?(info: any, next: () => void): any;
    close?(): void;
  }
}

*/

export class WinstonTransportSequelize extends Transport {

  constructor(public options: any) {
    super(options);
  }

  log(info: any, callback: any): any {
    console.log(info);
  }

  logv(info: any, callback: any): any {
    console.log('outra!!!!!');
  }

  close() {
    console.log('ok');
  }

}
