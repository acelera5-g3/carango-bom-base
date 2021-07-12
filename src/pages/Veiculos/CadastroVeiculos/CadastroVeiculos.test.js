import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import CadastroVeiculos from './CadastroVeiculos';
import MarcaService from '../../../services/Marca/MarcaService';
import { changeInput }  from '../../../tests/testing';

describe('ListagemVeiculos', () => {

  it('Deve listar os veiculos', () => {
    const { container } = render(<CadastroVeiculos />);
    expect(container).toBeDefined();
  });

  it('Verificar se as opções foram renderizadas', async () => {
    jest.spyOn(MarcaService, 'listar').mockResolvedValue([
      {
        id: 74,
        nome: 'HONDA',
      },
      {
        id: 4,
        nome: 'HYUNDAI',
      },
    ]);

    await act(async () => {
      await render(<CadastroVeiculos />);
    });

    expect(screen.getByText("HONDA")).toBeInTheDocument();
  });

  it('Deve mudar os valores dos inputs', async () => {
    jest.spyOn(MarcaService, 'listar').mockResolvedValue([
      {
        id: 74,
        nome: 'HONDA',
      },
      {
        id: 4,
        nome: 'HYUNDAI',
      },
    ]);

    await act(async () => {
      await render(<CadastroVeiculos />);
    });

    expect(true).toBe(true);

    const inputs = [
      {id: 'inputModelo', value: 'modelo'}, 
      {id: 'inputAno', value: '2010'}, 
      {id: 'inputValor', value: '20000' }
    ];

    inputs.forEach(async element => {
      await changeInput(element.id, element.value);
      const input = await screen.getByTestId(element.id).querySelector('input');
      expect(input.value).toBe(element.value);
    });
  });
});
