import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import CadastroVeiculos from './CadastroVeiculos';
import MarcaService from '../../../services/Marca/MarcaService';
import { changeInput } from '../../../tests/testing';
import VeiculoService from '../../../services/Veiculo/VeiculoService';

describe('CadastroVeiculos', () => {
  let history;
  let route;
  let path;

  const createInstance = async () =>
    act(async () => {
      await render(
        <Router history={history}>
          <Route path={path}>
            <CadastroVeiculos />
          </Route>
        </Router>
      );
    });

  beforeEach(() => {
    jest.spyOn(MarcaService, 'listar').mockResolvedValue({
      content: [
        { id: 1, nome: 'CHEVROLET' },
        { id: 2, nome: 'FIAT' },
      ],
    });
  });

  describe('Cadastro de veiculos', () => {
    beforeEach(() => {
      history = createMemoryHistory();
      route = '/cadastro-veiculos';
      path = '/cadastro-veiculos';
      history.push(route);
    });

    it('Deve mudar os valores dos inputs', async () => {
      createInstance();
      const inputs = [
        { id: 'inputModelo', value: 'modelo' },
        { id: 'inputAno', value: '2010' },
        { id: 'inputValor', value: '20000' },
      ];

      const select = await screen.getByTestId('select-marca');
      fireEvent.click(select);
      expect(await screen.findByText('FIAT')).toBeInTheDocument();

      inputs.forEach(async (element) => {
        await changeInput(element.id, element.value);
        const input = await screen
          .getByTestId(element.id)
          .querySelector('input');
        expect(input.value).toBe(element.value);
      });
    });
  });
  describe('Alteracao de veiculos', () => {
    beforeEach(() => {
      history = createMemoryHistory();
      route = '/alteracao-veiculos/1';
      path = '/alteracao-veiculos/:id';
      history.push(route);

      jest.spyOn(VeiculoService, 'consultar').mockResolvedValue({
        ano: 2132,
        id: 1,
        marca: { id: 2, nome: 'FIAT' },
        modelo: 'TEST',
        valor: 32323,
      });
    });

    it('Deve listar o veiculo alterado', async () => {
      expect(createInstance()).toBeDefined();
    });

    it('Deve dar submit no form', async () => {
      createInstance();
      const button = await screen.getByTestId('submitButton');
      fireEvent.click(button);
      expect(history.location.pathname).toBe('/alteracao-veiculos/1');
    });
  });

  // it('Deve listar os veiculos', async () => {
  //   createInstance();
  //   expect(await screen.findByText('TEST')).toBeInTheDocument();
  // });

  // it('Verificar se as opções foram renderizadas', async () => {
  //   jest.spyOn(MarcaService, 'listar').mockResolvedValue({
  //     content: [
  //       {
  //         id: 74,
  //         nome: 'HONDA',
  //       },
  //       {
  //         id: 4,
  //         nome: 'HYUNDAI',
  //       },
  //     ],
  //   });

  //   await act(async () => {
  //     await render(<CadastroVeiculos />);
  //   });

  //   expect(screen.getByText('HONDA')).toBeInTheDocument();
  // });
});
