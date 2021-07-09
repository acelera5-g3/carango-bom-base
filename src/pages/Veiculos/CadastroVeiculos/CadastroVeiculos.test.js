import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import CadastroVeiculos from './CadastroVeiculos';
import MarcaService from '../../../services/Marca/MarcaService';

describe('ListagemVeiculos', () => {
  it('Deve listar os veiculos', () => {
    const { container } = render(<CadastroVeiculos />);
    expect(container).toBeDefined();
  });

  // it('Deve alterar o ano selecionado', async () => {
  //   jest.spyOn(MarcaService, 'listar').mockResolvedValue([
  //     {
  //       id: 74,
  //       marca: 'HONDA',
  //     },
  //     {
  //       id: 4,
  //       marca: 'HYUNDAI',
  //     },
  //   ]);
  //   await act(async () => {
  //     await render(<CadastroVeiculos />);
  //   });

  //   const select = await screen.getByTestId('select-marca');
  //   fireEvent.click(select);
  //   const selectValue = await screen.findByText('HONDA');
  //   fireEvent.click(selectValue);

  //   expect(selectValue.value).toBe('HONDA');
  // });

  // it('Deve mostrar lista com itens', async () => {
  //   jest.spyOn(global, 'fetch').mockResolvedValue({
  //     json: jest.fn().mockResolvedValue([{
  //       "id": 74,
  //       "marca": "HONDA",
  //       "modelo": "Honda Civic",
  //       "ano": 2020,
  //       "valor": "R$ 70.000,000"
  //     }]),
  //   });
  //   render(<ListagemVeiculos />);
  //   expect(await screen.findByText('HONDA')).toBeInTheDocument();
  // });

  // it('Deve excluir uma Veiculo', async () => {
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
