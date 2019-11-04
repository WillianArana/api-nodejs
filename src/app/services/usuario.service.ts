import { injectable } from 'inversify';
import { IService } from '../interfaces/iservice';
import { sequelize } from '../../sequelize';
import { UsuarioModel } from '../models/usuario.model';
import { IUsuario } from '../interfaces/iusuario';

@injectable()
export class UsuarioService implements IService {
  private readonly repo = sequelize.getRepository(UsuarioModel);

  async obterUsuarios(): Promise<IUsuario[]> {
    return this.repo.findAll({ raw: true }).then((usuarios: IUsuario[]) => {
      return usuarios;
    });
  }

  adicionarUsuario(usuario: UsuarioModel) {
    this.repo.create(usuario);
  }

  modificarUsuario(usuario: UsuarioModel, id: number) {
    this.repo.update(usuario, { where: { id } });
  }

  excluirUsuario(id: number) {
    this.repo.destroy({ where: { id } });
  }
}
