import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ListagemVeiculos from './ListagemVeiculos';
import VeiculoService from '../../../services/Veiculo/VeiculoService';

describe('ListagemVeiculos', () => {
  beforeEach(() => {
    jest.spyOn(VeiculoService, 'listar').mockResolvedValue({
      content: [
        {
          id: 74,
          marca: { id: 1, nome: 'HONDA' },
          modelo: 'Honda Civic',
          ano: 2020,
          valor: 'R$ 70.000,000',
        },
      ],
    });
  });

  it('Deve listar os veiculos', async () => {
    await act(async () => {
      render(<ListagemVeiculos />);
    });

    expect(await screen.getByText('HONDA')).toBeInTheDocument();
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
