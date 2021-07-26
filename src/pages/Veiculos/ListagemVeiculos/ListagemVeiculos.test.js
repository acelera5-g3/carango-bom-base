import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Route, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import ListagemVeiculos from './ListagemVeiculos';
import VeiculoService from '../../../services/Veiculo/VeiculoService';

const history = createMemoryHistory();
const path = '/veiculos';
let route;
let testHistory;
let testLocation;

describe('Listagemveiculo', () => {
  const createInstance = async () => {
    act(async () => {
      await render(
        <MemoryRouter initialEntries={[path]}>
          <Route
            path={path}
            render={({ history, location }) => {
              testHistory = history;
              testLocation = location;
              return <ListagemVeiculos />;
            }}
          ></Route>
        </MemoryRouter>
      );
    });
  };
  beforeEach(() => {
    jest.spyOn(VeiculoService, 'listar').mockResolvedValue({
      content: [
        {
          id: 1,
          modelo: 'VEHICLE1',
          ano: 2132,
          valor: 32323,
          marca: { id: 3, nome: 'VEHICLE1 BRAND' },
        },
        {
          id: 2,
          modelo: 'VEHICLE2',
          ano: 2020,
          valor: 40000,
          marca: { id: 3, nome: 'VEHICLE2 BRAND' },
        },
      ],
    });
  });

  it('Deve instanciar o componente com veiculos', async () => {
    await render(<ListagemVeiculos />);
    expect(await screen.findByText('VEHICLE1')).toBeInTheDocument();
  });

  it('Deve alterar um veiculo', async () => {
    createInstance();
    const veiculo = await screen.findByText('VEHICLE1');
    const btnAlterar = screen.getByTestId('botao-alterar');
    fireEvent.click(veiculo);
    fireEvent.click(btnAlterar);
    console.log(testLocation);
    expect(testHistory.location.pathname).toBe('/alteracao-veiculos/1');
  });

  it('Deve excluir uma veiculo', async () => {
    jest.spyOn(VeiculoService, 'excluir').mockResolvedValue({
      id: 1,
      modelo: 'VEHICLE1',
      ano: 2132,
      valor: 32323,
      marca: { id: 3, nome: 'VEHICLE1 BRAND' },
    });
    jest
      .spyOn(VeiculoService, 'listar')
      .mockClear()
      .mockResolvedValueOnce({
        content: [
          {
            id: 1,
            modelo: 'VEHICLE1',
            ano: 2132,
            valor: 32323,
            marca: { id: 3, nome: 'VEHICLE1 BRAND' },
          },
          {
            id: 2,
            modelo: 'VEHICLE2',
            ano: 2020,
            valor: 40000,
            marca: { id: 3, nome: 'VEHICLE2 BRAND' },
          },
        ],
      })
      .mockResolvedValue({
        content: [
          {
            id: 2,
            modelo: 'VEHICLE2',
            ano: 2020,
            valor: 40000,
            marca: { id: 3, nome: 'VEHICLE1 BRAND' },
          },
        ],
      });
    createInstance();

    const fiatText = await screen.findByText('VEHICLE1');
    const botaoExcluir = screen.getByTestId('botao-excluir');

    fireEvent.click(fiatText);
    fireEvent.click(botaoExcluir);

    expect(await screen.findByText('VEHICLE1')).not.toBeInTheDocument();
  });

  it('Deve cadastrar uma veiculo', async () => {
    createInstance();
    const btnIncluir = screen.getByTestId('botao-incluir');
    fireEvent.click(btnIncluir);
    expect(testHistory.location.pathname).toBe('/cadastro-veiculos');
  });
});
