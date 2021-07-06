import MarcaService from './MarcaService';

describe('MarcaService', () => {
  it(('Deve cadastrar uma marca'), async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => (
        { id: 1, nome: 'Teste' }
      ),
    });
    const res = await MarcaService.cadastrar('Teste');

    expect(res.nome).toBe('Teste');
  });

  it(('Deve alterar uma marca'), async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => (
        { id: 1, nome: 'TesteAlterado' }
      ),
    });
    const res = await MarcaService.alterar({ id: 1, nome: 'TesteAlterado' });

    expect(res.nome).toBe('TesteAlterado');
  });

  it(('Deve consultar uma marca'), async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => (
        { id: 1, nome: 'Teste' }
      ),
    });
    const res = await MarcaService.consultar(1);

    expect(res.nome).toBe('Teste');
  });

  it(('Deve listar as marcas'), async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => [
        { id: 1, nome: 'Teste' },
      ],
    });
    const list = await MarcaService.listar();

    expect(list).toBeInstanceOf(Array);
  });

  it(('Deve excluir uma marca'), async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => (
        { id: 1, nome: 'Teste' }
      ),
    });
    const res = await MarcaService.excluir({ id: 1, nome: 'Teste' });

    expect(res.id).toBe(1);
  });
});
