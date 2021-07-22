import React from 'react';
import { Route, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen, fireEvent, act } from '@testing-library/react';
import CadastroMarca from './CadastroMarca';
import MarcaService from '../../../services/Marca/MarcaService';

describe('CadastroMarca', () => {
  let history;
  let pushSpy;
  let route;
  let path;

  const createInstance = async () =>
    act(async () => {
      await render(
        <Router history={history}>
          <Route path={path}>
            <CadastroMarca />
          </Route>
        </Router>
      );
    });

  const submitEvent = async () => {
    await createInstance();

    await act(async () => {
      const input = screen.getByTestId('inputMarca').querySelector('input');
      fireEvent.change(input, { target: { value: 'Teste' } });
      fireEvent.blur(input);
      const submit = screen.getByTestId('submitButton');

      fireEvent.click(submit);
    });
  };

  beforeEach(() => {
    const resolved = { id: 1, nome: 'Teste' };
    jest.spyOn(MarcaService, 'cadastrar').mockResolvedValue(() => resolved);
    jest.spyOn(MarcaService, 'alterar').mockResolvedValue(() => resolved);

    history = createMemoryHistory();

    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useHistory: () => ({
        push: jest.fn(),
      }),
    }));
  });

  describe('Cadastro de marca', () => {
    beforeEach(() => {
      route = '/cadastro-marca';
      path = '/cadastro-marca';
      history.push(route);
      pushSpy = jest.spyOn(history, 'push');
    });

    it('Deve instanciar o componente', () => {
      expect(createInstance()).toBeDefined();
    });

    it('Não pode habilitar botão de cadastro', () => {
      createInstance();

      const input = screen.getByTestId('inputMarca').querySelector('input');
      fireEvent.change(input, { target: { value: 'aa' } });
      fireEvent.blur(input);

      const submit = screen.getByTestId('submitButton');

      expect(submit).toBeDisabled();
    });

    it('Deve habilitar botão de cadastro', () => {
      createInstance();

      const input = screen.getByTestId('inputMarca').querySelector('input');
      fireEvent.change(input, { target: { value: 'Teste' } });
      fireEvent.blur(input);

      const submit = screen.getByTestId('submitButton');

      expect(submit).toBeEnabled();
    });

    it('Deve voltar a tela anterior', () => {
      createInstance();

      const button = screen.getByTestId('cancelarButton');
      fireEvent.click(button);

      expect(pushSpy).toHaveBeenCalled();
    });

    it('Deve enviar o form', async () => {
      await submitEvent();
      expect(pushSpy).toHaveBeenCalled();
    });
  });

  describe('Alteração de marca', () => {
    beforeEach(() => {
      history = createMemoryHistory();
      route = '/alteracao-marca/1';
      path = '/alteracao-marca/:id';
      history.push(route);
      pushSpy = jest.spyOn(history, 'push');

      jest
        .spyOn(MarcaService, 'consultar')
        .mockClear()
        .mockResolvedValue({
          content: [
            {
              id: 1,
              nome: 'PEUGEOUT',
            },
          ],
        });
    });

    it('Deve instanciar o componente', () => {
      expect(createInstance()).toBeDefined();
    });

    it('Deve enviar o form', async () => {
      await submitEvent();
      expect(pushSpy).toHaveBeenCalled();
    });
  });
});
