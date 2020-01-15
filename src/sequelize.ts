import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { format } from 'date-fns';
import fs = require('fs');
import appRoot from 'app-root-path';

const logStream = fs.createWriteStream(`${appRoot}/src/logs/sql.log`, { flags: 'a' });

//#region Configuração do ORM Sequelize obtidas no arquivo .env
dotenv.config({ path: './.env' });
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
  logging: (msg: string) => logStream.write(` ${format(new Date(), 'dd/MM/yyyy HH:mm:ss:SSSS')} -> ${msg}, \n`),
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
