import { injectable } from 'inversify';
import { IService } from '../interfaces/iservice';
import { IUsuario } from '../interfaces/iusuario';
import UsuarioModel from '../models/usuario.model';
import { getRepository } from '../shared/repository';

@injectable()
export class UsuarioService implements IService {

  constructor(private repo: any = getRepository(UsuarioModel)) { }

  async obterUsuarios(): Promise<IUsuario[]> {
    return this.repo.findAll({ raw: true });
  }

  async qtdUsuarios(): Promise<any> {
    return this.repo.query('SELECT COUNT(*) AS QTD FROM usuario', {
      raw: true,
      plain: true,
    });
  }

  async getUsers(): Promise<IUsuario[]> {
    return this.repo.findAll({ raw: true });
  }

  async getUser(where: any, raw = true): Promise<UsuarioModel | null> {
    const query = { raw, where };
    return this.repo.findOne(query);
  }

  async getUserById(id: any, raw = true): Promise<UsuarioModel | null> {
    const query = { raw, id };
    return this.repo.findOne(query);
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

  calcularIMC(peso: number, altura: number): number {
    return (peso / (altura * altura));
  }
}
