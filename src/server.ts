import 'reflect-metadata';
import container from './app/config/inversify.config';
import router from './router';
import { json, urlencoded } from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Application } from 'express';
import { configLog, configLogError } from './winston';
import { App } from './app';
import { sequelize } from './sequelize';

class Server {
  static init(): void {
    if (!!!this.server) {
      this.server = new Server();
    }
  }
  private static server: Server;

  private constructor() {
    const server = new InversifyExpressServer(container, router);
    server.setConfig((app) => {
      this.useBodyParserUrlencoded(app);
      this.useBodyParserJson(app);
      this.useWinston(app);
    });
    this.createServer(server);
  }

  private useBodyParserJson(app: Application): void {
    app.use(json());
  }

  private useBodyParserUrlencoded(app: Application): void {
    app.use(urlencoded({ extended: true }));
  }

  private useWinston(app: Application): void {
    app.use(configLog());
    app.use(configLogError());
  }

  private createServer(server: InversifyExpressServer): void {
    App.createServer(server);
  }
}
//#region Inicio da aplicação
(async () => {
  const isResetDatabase = process.argv.includes('resetDatabase');
  if (isResetDatabase) {
    await sequelize.sync({ force: true, alter: true });
  }
  Server.init();
})();
//#endregionS
