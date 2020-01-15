import { NotFoundExeption } from './../exceptions/not-found.exception';
import { UsuarioService } from './usuario.service';
import { UnauthorizedExeption } from './../exceptions/unauthorized.exception';
import { injectable, inject } from 'inversify';
import { TYPES } from '../config/types';
import { IService } from '../interfaces/iservice';
import { IUsuario } from '../interfaces/iusuario';
import * as jwt from 'jsonwebtoken';
import { TokenData } from '../interfaces/token-data';

@injectable()
export class AuthService implements IService {

  constructor(@inject(TYPES.UsuarioService) private usuarioSevice: UsuarioService) { }

  private get key(): string {
    const saltKey = process.env.SALT_KEY;
    if (!saltKey) {
      throw new NotFoundExeption('problema com token');
    }
    return saltKey;
  }

  async authenticate(user: IUsuario): Promise<{ token: string, data: {} }> {
    const currentUser = await this.usuarioSevice.getUser({ login: user.login, senha: user.senha });
    if (!currentUser || !currentUser.id) {
      throw new UnauthorizedExeption('Login ou Senha inválido');
    }

    const data = {
      id: currentUser.id,
      login: currentUser.login,
      nome: currentUser.nome,
      data: Date.now(),
    };

    const token = await this.generateToken(data);
    return { token, data };
  }

  async refreshToken(token: string): Promise<{ newToken: string, data: {} }> {
    const tokenData = await this.decodeToken(token) as TokenData;
    const user = await this.usuarioSevice.getUserById(tokenData.id);
    if (!user) {
      throw new NotFoundExeption('Usuário não encontrado');
    }

    const data = {
      id: user.id,
      login: user.login,
      nome: user.nome,
      data: Date.now(),
    };

    const newToken = await this.generateToken(data);
    return { newToken, data };
  }

  async generateToken(data: any): Promise<any> {
    return jwt.sign(data, this.key, {
      expiresIn: '1d',
    });
  }

  async decodeToken(token: any): Promise<any> {
    const data = await jwt.verify(token, this.key);
    return data;
  }

  async authorize(req: any, res: any, next: any): Promise<void> {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
      throw new UnauthorizedExeption('Acesso Restrito');
    }
    await jwt.verify(token, this.key, (error: any) => {
      if (error) {
        throw new UnauthorizedExeption('Token Inválido');
      } else {
        next();
      }
    });
  }

}
