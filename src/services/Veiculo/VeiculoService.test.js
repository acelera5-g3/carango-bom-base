import VeiculoService from './VeiculoService';

describe('VeiculoService', () => {
  it(('Deve listar os veiculos'), async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => [{
        id: 1, modelo: 'Teste 111', ano: 2021, valor: 80000.00, marca: { id: 1, nome: 'Teste' },
      }],
    });
    const res = await VeiculoService.listar();

    console.log(res);

    expect(res).toBeInstanceOf(Array);
  });
});
