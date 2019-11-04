import 'reflect-metadata';
import container from './app/config/inversify.config';
import { json, urlencoded } from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';
import { sequelize } from './sequelize';
import { Application } from 'express';
import { App } from './app';

//#region import controlls
import './app/config/controllers';
//#endregion

class Server {
  static init() {
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

  private useBodyParserJson(app: Application) {
    app.use(json());
  }

  private useBodyParserUrlencoded(app: Application) {
    app.use(urlencoded({ extended: true }));
  }

  private createServer(server: InversifyExpressServer) {
    App.createServer(server);
  }
}

(async () => {
  await sequelize.sync({ force: false, alter: true });
  Server.init();
})();
