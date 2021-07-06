import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import ListagemMarcas from './ListagemMarcas';

describe('ListagemMarcas', () => {
  let history;

  beforeEach(() => {
    history = createMemoryHistory();

    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useHistory: () => ({
        push: jest.fn(),
      }),
    }));
  });

  it('Deve listar os veiculos', () => {
    const { container } = render(<ListagemMarcas />);
    expect(container).toBeDefined();
  });

  it('Deve mostrar lista vazia quando não existir retorno da api', async () => {
    await render(<ListagemMarcas />);
    const check = await screen.getByText('No rows');
    expect(check).toBeInTheDocument();
  });

  it('Deve mostrar lista com itens', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue([{ id: 74, nome: 'CHEVROLET' }]),
    });
    render(<ListagemMarcas />);
    expect(await screen.findByText('CHEVROLET')).toBeInTheDocument();
  });

  it('Deve excluir uma marca', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue([
        { id: 74, nome: 'CHEVROLET' },
        { id: 12, nome: 'FIAT' },
      ]),
    });
    render(<ListagemMarcas />);
    const fiatText = await screen.findByText('FIAT');
    fireEvent.click(fiatText);
    const botaoExcluir = screen.getByTestId('botao-excluir');
    fireEvent.click(botaoExcluir);
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue([{ id: 74, nome: 'CHEVROLET' }]),
    });
    expect(await screen.findByText('FIAT')).not.toBeInTheDocument();
  });

  // it('Deve alterar a marca', async () => {
  //   jest.spyOn(global, 'fetch').mockResolvedValue({
  //     json: jest.fn().mockResolvedValue([{ id: 74, nome: 'CHEVROLET' }]),
  //   });
  //   const pushSpy = jest.spyOn(history, 'push');
  //   render(<ListagemMarcas />);
  //   await act(async () => {
  //     const brandRow = await screen.findByText('CHEVROLET');
  //     fireEvent.click(brandRow);
  //   });
  //   await act(async () => {
  //     const botaoAlterar = await screen.getByTestId('botao-alterar');
  //     fireEvent.click(botaoAlterar);
  //   });

  //   expect(pushSpy).toHaveBeenCalled();
  // });
});
