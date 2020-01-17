import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { LogService } from './app/services/log.service';

//#region Configuração do ORM Sequelize obtidas no arquivo .env
dotenv.config({ path: './.env' });
const logService = LogService.init();
const options = {
  repositoryMode: true,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  dialect: process.env.DB_DIALECT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  syncOnAssociation: false,
  storage: ':memory:',
  logging: (msg: string) => logService.notify(msg),
  models: [__dirname + '/app/models'],
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
} as SequelizeOptions;
//#endregion

const _sequelize = new Sequelize(options);
_sequelize
  .authenticate()
  .then(() => {
    console.log('DB connection sucessful.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
    setTimeout(() => {
      process.kill(process.pid, 'SIGTERM');
    }, 300);
    return Promise.reject('Erro ao conectar com o banco de dados!');
  });

export const sequelize = _sequelize;
