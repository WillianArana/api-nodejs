import { expect } from 'chai';
import { sequelize } from '../src/sequelize';
import { UsuarioService } from '../src/app/services/usuario.service';

describe('Exemplo de teste dos usuarios',
  () => {
    let usuarioService: UsuarioService;
    before(async () => {
      await sequelize.sync({ force: false, alter: true });
      usuarioService = new UsuarioService();
    });
    after(() => {
      sequelize.close();
    });
    it('deve obter os usuarios', async () => {
      const usuarios = await usuarioService.obterUsuarios();
      const usuario = usuarios[0];
      expect(usuario.id).to.equal(1);
      expect(usuario.nome).to.equal('will');
    });
  });
