import { inject } from 'inversify';
import { controller, response, request, requestParam, httpGet, httpPost, httpPut, httpDelete } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { UsuarioService } from '../services/usuario.service';
import { TYPES } from '../config/types';
import { Handlers } from '../config/handlers';

@controller('/usuarios')
export class UsuarioController {

  constructor(
    @inject(TYPES.Service) private usuarioSevice: UsuarioService) { }

  @httpGet('/')
  public async get(@response() res: Response) {
    try {
      const usuarios = await this.usuarioSevice.obterUsuarios();
      res.send({ usuarios });
    } catch (e) {
      Handlers.onError(res, { error: 'Internal server error' });
    }
  }

  @httpPost('/')
  public async post(@request() req: Request, @response() res: Response) {
    try {
      const usuario = req.body;
      this.usuarioSevice.adicionarUsuario(usuario);
      Handlers.onCreated(res, 'Usuário criado!');
    } catch (e) {
      Handlers.onError(res, { error: 'Internal server error' });
    }
  }

  @httpPut('/')
  public async put(@request() req: Request, @response() res: Response) {
    try {
      const id = req.query.id;
      const usuario = req.body;
      this.usuarioSevice.modificarUsuario(usuario, id);
      Handlers.onSuccess(res, 'Usuário alterado!');
    } catch (e) {
      Handlers.onError(res, { error: 'Internal server error' });
    }
  }

  @httpDelete('/:id')
  public async delete(@requestParam('id') id: number, @response() res: Response): Promise<void> {
    try {
      this.usuarioSevice.excluirUsuario(id);
      Handlers.onSuccess(res, 'Usuário removido!');
    } catch (e) {
      Handlers.onError(res, { error: 'Internal server error' });
    }
  }

}
