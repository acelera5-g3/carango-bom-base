import VeiculoService from './VeiculoService';

describe('VeiculoService', () => {
  it(('Deve cadastrar uma veiculo'), async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => (
      {
      "id": 74,
      "marca": "Teste",
      "modelo": "HB20",
      "ano": 2020,
      "valor": "R$ 56.000,000"
      } 
      ),
    });
    const res = await VeiculoService.cadastrar('Teste');

    expect(res.marca).toBe('Teste');
  });

  it(('Deve alterar uma veiculo'), async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => (
        {
          "id": 74,
          "marca": "TesteAlterado",
          "modelo": "HB20",
          "ano": 2020,
          "valor": "R$ 56.000,000"
          } 
      ),
    });
    const res = await VeiculoService.alterar({
      "id": 74,
      "marca": "TesteAlterado",
      "modelo": "HB20",
      "ano": 2020,
      "valor": "R$ 56.000,000"
      } );

    expect(res.marca).toBe('TesteAlterado');
  });

  it(('Deve consultar uma veiculo'), async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => (
         {
      "id": 74,
      "marca": "Teste",
      "modelo": "HB20",
      "ano": 2020,
      "valor": "R$ 56.000,000"
    }
      ),
    });
    const res = await VeiculoService.consultar(74);

    expect(res.marca).toBe('Teste');
  });

  it(('Deve listar as veiculos'), async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => [
         {
      "id": 74,
      "marca": "Teste",
      "modelo": "HB20",
      "ano": 2020,
      "valor": "R$ 56.000,000"
    },
      ],
    });
    const list = await VeiculoService.listar();

    expect(list).toBeInstanceOf(Array);
  });

  it(('Deve excluir uma veiculo'), async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => (
         {
      "id": 74,
      "marca": "Teste",
      "modelo": "HB20",
      "ano": 2020,
      "valor": "R$ 56.000,000"
    }
      ),
    });
    const res = await VeiculoService.excluir( {
      "id": 74,
      "marca": "Teste",
      "modelo": "HB20",
      "ano": 2020,
      "valor": "R$ 56.000,000"
    });

    expect(res.id).toBe(74);
  });
});
