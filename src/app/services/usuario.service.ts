import { injectable } from 'inversify';
import { IService } from '../interfaces/iservice';
import { sequelize } from '../../sequelize';
import { IUsuario } from '../interfaces/iusuario';
import UsuarioModel from '../models/usuario.model';

@injectable()
export class UsuarioService implements IService {
  private readonly repo = sequelize.getRepository(UsuarioModel);

  async obterUsuarios(): Promise<IUsuario[]> {
    return this.repo.findAll({ raw: true }).then((usuarios: IUsuario[]) => {
      return usuarios;
    });
  }

  adicionarUsuario(usuario: UsuarioModel): void {
    this.repo.create(usuario);
  }

  modificarUsuario(usuario: UsuarioModel, id: number): void {
    this.repo.update(usuario, { where: { id } });
  }

  excluirUsuario(id: number): void {
    this.repo.destroy({ where: { id } });
  }
}
