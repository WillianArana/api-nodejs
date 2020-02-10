import { injectable } from 'inversify';
import { sequelize } from '../../sequelize';
import { IService } from '../interfaces/iservice';
import { IUsuario } from '../interfaces/iusuario';
import ContatoModel from '../models/contato.model';
import TelefoneModel from '../models/telefone.model';
import UsuarioModel from '../models/usuario.model';
import { getRepository } from '../shared/repository';

@injectable()
export class UsuarioService implements IService {

  constructor(
    private repo: any = sequelize.getRepository(UsuarioModel),
    private repoContato: any = getRepository(ContatoModel),
    private repoTelefone: any = getRepository(TelefoneModel),
  ) { }

  async obterUsuarios(): Promise<IUsuario[]> {
    return this.repo.findAll({
      raw: false,
      include: [{ model: this.repoContato, include: this.repoTelefone }],
    });
  }

  async qtdUsuarios(): Promise<any> {
    // return this.repo.query('SELECT COUNT(*) AS QTD FROM usuario', {
    //   raw: true,
    //   plain: true,
    // });
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
    this.repo.create(usuario, { include: [{ model: this.repoContato, include: this.repoTelefone }] });
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
