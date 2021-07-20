import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Route, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ListagemMarcas from './ListagemMarcas';
import MarcaService from '../../../services/Marca/MarcaService';

describe('ListagemMarcas', () => {
  const history = createMemoryHistory();
  let pushSpy;

  beforeEach(() => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useHistory: () => ({
        push: jest.fn(),
      }),
    }));
    pushSpy = jest.spyOn(history, 'push');
  });

  beforeEach(() => {
    jest.spyOn(MarcaService, 'listar').mockResolvedValue([
      { id: 1, nome: 'CHEVROLET' },
      { id: 2, nome: 'FIAT' },
    ]);
  });

  it('Deve instanciar o componente', () => {
    const { container } = render(<ListagemMarcas />);
    expect(container).toBeDefined();
  });

  // it('Deve mostrar lista vazia quando não existir retorno da api', async () => {
  //   jest.spyOn(MarcaService, 'listar').mockClear().mockResolvedValueOnce([]);
  //   await render(<ListagemMarcas />);
  //   const check = await screen.getByText('No rows');
  //   expect(check).toBeInTheDocument();
  // });

  // it('Deve mostrar lista com itens', async () => {
  //   jest
  //     .spyOn(MarcaService, 'listar')
  //     .mockResolvedValue([{ id: 1, nome: 'TEST' }]);
  //   await render(<ListagemMarcas />);
  //   expect(await screen.findByText('TEST')).toBeInTheDocument();
  // });

  // it('Deve excluir uma marca', async () => {
  //   jest
  //     .spyOn(MarcaService, 'excluir')
  //     .mockResolvedValue([{ id: 2, nome: 'TEST 2' }]);
  //   jest
  //     .spyOn(MarcaService, 'listar')
  //     .mockClear()
  //     .mockResolvedValueOnce([
  //       { id: 1, nome: 'CHEVROLET' },
  //       { id: 2, nome: 'FIAT' },
  //     ])
  //     .mockResolvedValue([{ id: 1, nome: 'CHEVROLET' }]);

  //   render(<ListagemMarcas />);

  //   const fiatText = await screen.findByText('FIAT');
  //   const botaoExcluir = screen.getByTestId('botao-excluir');

  //   fireEvent.click(fiatText);
  //   fireEvent.click(botaoExcluir);

  //   expect(await screen.findByText('FIAT')).not.toBeInTheDocument();
  // });

  // it('Deve ir para o cadastro de marca', async () => {
  //   render(
  //     <Router history={history}>
  //       <Route path="/">
  //         <ListagemMarcas />
  //       </Route>
  //     </Router>
  //   );

  //   const button = screen.getByTestId('botao-incluir');
  //   fireEvent.click(button);
  //   expect(pushSpy).toHaveBeenCalledWith('/cadastro-marca');
  // });

  // it('Deve ir para a alteração de marca', async () => {
  //   render(
  //     <Router history={history}>
  //       <Route path="/">
  //         <ListagemMarcas />
  //       </Route>
  //     </Router>
  //   );

  //   const fiatText = await screen.findByText('FIAT');
  //   const botaoAlterar = screen.getByTestId('botao-alterar');
  //   fireEvent.click(fiatText);
  //   fireEvent.click(botaoAlterar);
  //   expect(pushSpy).toHaveBeenCalledWith('/alteracao-marca/2');
  // });
});
