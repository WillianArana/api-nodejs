import 'reflect-metadata';
import container from './app/config/inversify.config';
import { json, urlencoded } from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';
import { sequelize } from './sequelize';
import { Application } from 'express';
import { App } from './app';

class Server {
  static init(): void {
    if (!!!this.server) {
      this.server = new Server();
    }
  }
  private static server: Server;

  private constructor() {
    const server = new InversifyExpressServer(container);
    server.setConfig((app) => {
      this.useBodyParserUrlencoded(app);
      this.useBodyParserJson(app);
    });
    this.createServer(server);
  }

  private useBodyParserJson(app: Application): void {
    app.use(json());
  }

  private useBodyParserUrlencoded(app: Application): void {
    app.use(urlencoded({ extended: true }));
  }

  private createServer(server: InversifyExpressServer): void {
    App.createServer(server);
  }
}
//#region Inicio da aplicação
(async () => {
  await sequelize.sync({ force: false, alter: true });
  Server.init();
})();
//#endregionS
