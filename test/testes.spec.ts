import { expect } from 'chai';
import { TesteService } from '../src/app/services/teste.service';

describe('Exemplo de teste',
  () => {
    const testeService = new TesteService();
    it('o primeiro teste deve ter 1', () => {
      const testes = testeService.obterTestes();
      expect(testes[0]).to.equal(1);
    });
  });
