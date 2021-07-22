import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Route, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import ListagemMarcas from './ListagemMarcas';
import MarcaService from '../../../services/Marca/MarcaService';

const history = createMemoryHistory();
let path;

describe('ListagemMarcas', () => {
  const createInstance = async () => {
    act(async () => {
      await render(
        <Router history={history}>
          <Route path={path}>
            <ListagemMarcas />
          </Route>
        </Router>
      );
    });
  };
  beforeEach(() => {
    jest.spyOn(MarcaService, 'listar').mockResolvedValue({
      content: [
        { id: 1, nome: 'CHEVROLET' },
        { id: 2, nome: 'FIAT' },
      ],
    });
  });

  it('Deve instanciar o componente COM MARCAS', async () => {
    createInstance();
    expect(await screen.findByText('CHEVROLET')).toBeInTheDocument();
  });

  it('Deve alterar uma marca', async () => {
    createInstance();
    const marca = await screen.findByText('FIAT');
    const btnAlterar = screen.getByTestId('botao-alterar');
    fireEvent.click(marca);
    fireEvent.click(btnAlterar);
    expect(history.location.pathname).toBe('/alteracao-marca/2');
  });

  it('Deve excluir uma marca', async () => {
    jest
      .spyOn(MarcaService, 'excluir')
      .mockResolvedValue({ id: 2, nome: 'TEST 2' });
    jest
      .spyOn(MarcaService, 'listar')
      .mockClear()
      .mockResolvedValueOnce({
        content: [
          { id: 1, nome: 'CHEVROLET' },
          { id: 2, nome: 'FIAT' },
        ],
      })
      .mockResolvedValue({ content: [{ id: 1, nome: 'CHEVROLET' }] });

    render(<ListagemMarcas />);

    const fiatText = await screen.findByText('FIAT');
    const botaoExcluir = screen.getByTestId('botao-excluir');

    fireEvent.click(fiatText);
    fireEvent.click(botaoExcluir);

    expect(await screen.findByText('FIAT')).not.toBeInTheDocument();
  });

  it('Deve cadastrar uma marca', async () => {
    createInstance();
    const btnIncluir = screen.getByTestId('botao-incluir');
    fireEvent.click(btnIncluir);
    expect(history.location.pathname).toBe('/cadastro-marca');
  });
});
