import { InversifyExpressServer } from 'inversify-express-utils';
import { Application } from 'express';
import { Winston } from './winston';

const port = process.env.SEVER_PORT || 3000;

export class App {
  static createServer(server: InversifyExpressServer): void {
    const app = server.build();
    this.configLog(app);
    this.disable(app);
    this.setPort(app);
    this.listen(app);
  }

  private static configLog(app: Application): void {
    Winston.configLog(app);
  }

  private static disable(app: Application): void {
    app.disable('x-powered-by');
  }

  private static setPort(app: Application): void {
    app.set('port', port);
  }

  private static listen(app: Application): void {
    app.listen(app.get('port'), () => {
      console.info('Express server listening on port ' + app.get('port'));
    });
  }
}
