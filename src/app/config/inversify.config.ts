//#region Novos 'controllers' aqui!
import '../controllers/usuario.controller';

//#endregion
import { Container } from 'inversify';
import { TYPES } from './types';
import { IService } from '../interfaces/iservice';
import { UsuarioService } from '../services/usuario.service';
import { AuthorizeMiddleware } from './../middlewares/authorize.middleware';

//#region Novas classes injetadas aqui!
const container = new Container();

container.bind<AuthorizeMiddleware>(TYPES.AuthorizeMiddleware).to(AuthorizeMiddleware);
container
  .bind<IService>(TYPES.Service)
  .to(UsuarioService)
  .inSingletonScope();

//#endregion
export default container;
