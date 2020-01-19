// tslint:disable-next-line: no-var-requires
const sequelizeMock = require('sequelize-mock');
import { expect } from 'chai';
import { UsuarioService } from '../src/app/services/usuario.service';

describe('Exemplo de teste dos usuarios',
  () => {
    let usuarioService: UsuarioService;
    before(async () => {
      const dbConnectionMock = new sequelizeMock();
      const repoMock = dbConnectionMock.define('usuario', {
        id: 0,
        nome: 'Willian',
        login: 'will',
        senha: 'teste',
      });

      usuarioService = new UsuarioService(repoMock);
    });
    after(() => {
      // close
    });
    it('deve existir usuarioService', () => {
      // tslint:disable-next-line: no-unused-expression
      expect(usuarioService).to.exist;
    });
    it('deve obter o usuario', async () => {
      const usuario = await (await usuarioService.getUserById(0));
      expect(usuario?.get('id')).to.equal(1);
      expect(usuario?.get('nome')).to.equal('Willian');
    });
    it('deve ter imc 3,4225', async () => {
      const imc = usuarioService.calcularIMC(85, 1.85);
      expect(imc).to.equal(24.835646457268076);
    });
  });
