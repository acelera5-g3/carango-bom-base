import React from 'react';
import { render, screen } from '@testing-library/react';
import ListagemVeiculos from './ListagemVeiculos';

describe('ListagemVeiculos', () => {
  it('Deve listar os veiculos', () => {
    const { container } = render(<ListagemVeiculos />);
    expect(container).toBeDefined();
  });

  it('Deve mostrar lista vazia quando não existir retorno da api', async () => {
    await render(<ListagemVeiculos />);
    const check = await screen.getByText('No rows');
    expect(check).toBeInTheDocument();
  });

  it('Deve mostrar lista com itens', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue([
        {
          id: 74,
          marca: 'HONDA',
          modelo: 'Honda Civic',
          ano: 2020,
          valor: 'R$ 70.000,000',
        },
      ]),
    });
    render(<ListagemVeiculos />);
    expect(await screen.findByText('HONDA')).toBeInTheDocument();
  });

  // it.skip('Deve excluir uma Veiculo', async () => {
  //   jest.spyOn(global, 'fetch').mockResolvedValue({
  //     json: jest.fn().mockResolvedValue([
  //       {
  //         "id": 74,
  //         "marca": "HONDA",
  //         "modelo": "Honda Civic",
  //         "ano": 2020,
  //         "valor": "R$ 70.000,000"
  //       },
  //       {
  //         "id": 4,
  //         "marca": "HYUNDAY",
  //         "modelo": "HB20",
  //         "ano": 2020,
  //         "valor": "R$ 56.000,000"
  //       }
  //     ]),
  //   });
  //   render(<ListagemVeiculos />);
  //   const fiatText = await screen.findByText('HONDA');
  //   fireEvent.click(fiatText);
  //   const botaoExcluir = screen.getByTestId('botao-excluir');
  //   fireEvent.click(botaoExcluir);
  //   jest.spyOn(global, 'fetch').mockResolvedValue({
  //     json: jest.fn().mockResolvedValue([{
  //       "id": 4,
  //       "marca": "HYUNDAY",
  //       "modelo": "HB20",
  //       "ano": 2020,
  //       "valor": "R$ 56.000,000"
  //     }]),
  //   });
  //   expect(await screen.findByText('HONDA')).not.toBeInTheDocument();
  // });
});
