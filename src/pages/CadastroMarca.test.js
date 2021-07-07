import React from 'react';
import { Route, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import {
  render, screen, fireEvent, act,
} from '@testing-library/react';
import CadastroMarca from './CadastroMarca';
import MarcaService from '../services/Marca/MarcaService';

describe('CadastroMarca', () => {
  describe('Cadastro de marca', () => {
    let history;
    beforeEach(() => {
      history = createMemoryHistory();
      const route = '/cadastro-marca';
      history.push(route);

      jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useHistory: () => ({
          push: jest.fn(),
        }),
      }));
    });
    it(('Deve instanciar o componente'), () => {
      const { container } = render(
        <Router history={history}>
          <CadastroMarca />
        </Router>,
      );
      expect(container).toBeDefined();
    });

    it('Não pode habilitar botão de cadastro', () => {
      render(
        <Router history={history}>
          <CadastroMarca />
        </Router>,
      );
      const input = screen.getByTestId('inputMarca').querySelector('input');
      fireEvent.change(input, { target: { value: 'aa' } });
      fireEvent.blur(input);

      const submit = screen.getByTestId('submitButton');

      expect(submit).toBeDisabled();
    });

    it('Deve habilitar botão de cadastro', () => {
      render(
        <Router history={history}>
          <CadastroMarca />
        </Router>,
      );
      const input = screen.getByTestId('inputMarca').querySelector('input');
      fireEvent.change(input, { target: { value: 'Teste' } });
      fireEvent.blur(input);

      const submit = screen.getByTestId('submitButton');

      expect(submit).toBeEnabled();
    });

    it('Deve voltar a tela anterior', () => {
      const pushSpy = jest.spyOn(history, 'push');
      render(
        <Router history={history}>
          <CadastroMarca />
        </Router>,
      );
      const button = screen.getByTestId('cancelarButton');
      fireEvent.click(button);

      expect(pushSpy).toHaveBeenCalled();
    });

    it('Deve enviar o form', async () => {
      jest.spyOn(MarcaService, 'cadastrar').mockResolvedValue(() => ({ id: 1, nome: 'Teste' }));

      const pushSpy = jest.spyOn(history, 'push');

      render(
          <Router history={history}>
            <CadastroMarca />
          </Router>,
      );

      const input = screen.getByTestId('inputMarca').querySelector('input');
      await act(async () => {
        fireEvent.change(input, { target: { value: 'Teste' } });
        fireEvent.blur(input);
        const submit = screen.getByTestId('submitButton');

        fireEvent.click(submit);
      });
      expect(pushSpy).toHaveBeenCalled();
    });
  });

  describe('Alteração de marca', () => {
    let history;
    beforeEach(() => {
      history = createMemoryHistory();
      const route = '/alteracao-marca/1';
      history.push(route);

      jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useHistory: () => ({
          push: jest.fn(),
        }),
      }));
    });

    it(('Deve instanciar o componente'), () => {
      const { container } = render(
        <Router history={history}>
          <Route path='/alteracao-marca/:id'>
            <CadastroMarca />
          </Route>
        </Router>,
      );
      expect(container).toBeDefined();
    });

    it('Deve enviar o form', async () => {
      jest.spyOn(MarcaService, 'alterar').mockResolvedValue(() => ({ id: 1, nome: 'Teste' }));

      const pushSpy = jest.spyOn(history, 'push');

      render(
        <Router history={history}>
          <Route path='/alteracao-marca/:id'>
            <CadastroMarca />
          </Route>
      </Router>,
      );

      const input = screen.getByTestId('inputMarca').querySelector('input');
      await act(async () => {
        fireEvent.change(input, { target: { value: 'Teste' } });
        fireEvent.blur(input);
        const submit = screen.getByTestId('submitButton');

        fireEvent.click(submit);
      });
      expect(pushSpy).toHaveBeenCalled();
    });
  });
});
