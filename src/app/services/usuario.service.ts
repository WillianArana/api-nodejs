import { injectable } from 'inversify';
import { IService } from '../interfaces/iservice';
import { sequelize } from '../../sequelize';
import { IUsuario } from '../interfaces/iusuario';
import UsuarioModel from '../models/usuario.model';

@injectable()
export class UsuarioService implements IService {
  private readonly repo = sequelize.getRepository(UsuarioModel);

  async obterUsuarios(): Promise<IUsuario[]> {
    return this.repo.findAll({ raw: true });
  }

  async qtdUsuarios(): Promise<any> {
    return sequelize.query('SELECT COUNT(*) AS QTD FROM usuario', {
      raw: true,
      plain: true,
    });
  }

  async adicionarUsuario(usuario: UsuarioModel): Promise<void> {
    this.repo.create(usuario);
  }

  async modificarUsuario(usuario: UsuarioModel, id: number): Promise<void> {
    this.repo.update(usuario, { where: { id } });
  }

  async excluirUsuario(id: number): Promise<void> {
    this.repo.destroy({ where: { id } });
  }
}
