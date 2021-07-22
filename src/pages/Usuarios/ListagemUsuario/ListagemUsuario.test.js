import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Route, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import ListagemUsuario from './ListagemUsuario';
import UsuarioService from '../../../services/UsuarioService/UsuarioService';

const history = createMemoryHistory();
let path;

describe('ListagemUsuario', () => {
  const createInstance = async () => {
    act(async () => {
      await render(
        <Router history={history}>
          <Route path={path}>
            <ListagemUsuario />
          </Route>
        </Router>
      );
    });
  };
  beforeEach(() => {
    jest.spyOn(UsuarioService, 'listar').mockResolvedValue({
      content: [
        { id: 1, email: 'teste@teste.com' },
        { id: 2, email: 'teste2@teste.com' },
      ],
    });
  });

  it('Deve instanciar o componente com usuarios', async () => {
    await render(<ListagemUsuario />);
    expect(await screen.findByText('teste@teste.com')).toBeInTheDocument();
  });

  // it('Deve alterar um usuario', async () => {
  //   createInstance();
  //   const usuario = await screen.findByText('teste@teste.com');
  //   const btnAlterar = screen.getByTestId('botao-alterar');
  //   fireEvent.click(usuario);
  //   fireEvent.click(btnAlterar);
  //   expect(history.location.pathname).toBe('/alteracao-usuario/1');
  // });

  // it('Deve excluir uma usuario', async () => {
  //   jest
  //     .spyOn(UsuarioService, 'excluir')
  //     .mockResolvedValue({ id: 1, email: 'teste@teste.com' });
  //   jest
  //     .spyOn(UsuarioService, 'listar')
  //     .mockClear()
  //     .mockResolvedValueOnce({
  //       content: [
  //         { id: 1, email: 'teste@teste.com' },
  //         { id: 2, email: 'teste2@teste.com' },
  //       ],
  //     })
  //     .mockResolvedValue({ content: [{ id: 2, email: 'teste2@teste.com' }] });
  //   createInstance();

  //   const fiatText = await screen.findByText('teste@teste.com');
  //   const botaoExcluir = screen.getByTestId('botao-excluir');

  //   fireEvent.click(fiatText);
  //   fireEvent.click(botaoExcluir);

  //   expect(await screen.findByText('teste@teste.com')).not.toBeInTheDocument();
  // });

  it('Deve cadastrar uma usuario', async () => {
    createInstance();
    const btnIncluir = screen.getByTestId('botao-incluir');
    fireEvent.click(btnIncluir);
    expect(history.location.pathname).toBe('/cadastro-usuario');
  });
});
