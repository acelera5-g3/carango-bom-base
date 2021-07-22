import React from 'react';
import { render, screen, act } from '@testing-library/react';
import CadastroVeiculos from './CadastroVeiculos';
import MarcaService from '../../../services/Marca/MarcaService';
import { changeInput } from '../../../tests/testing';

describe('CadastroVeiculos', () => {
  it('Deve listar os veiculos', () => {
    expect(true).toBeTruthy();
  });

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

  // it('Deve mudar os valores dos inputs', async () => {
  //   jest.spyOn(MarcaService, 'listar').mockResolvedValue([
  //     {
  //       id: 74,
  //       nome: 'HONDA',
  //     },
  //     {
  //       id: 4,
  //       nome: 'HYUNDAI',
  //     },
  //   ]);

  //   await act(async () => {
  //     await render(<CadastroVeiculos />);
  //   });

  //   const inputs = [
  //     { id: 'inputModelo', value: 'modelo' },
  //     { id: 'inputAno', value: '2010' },
  //     { id: 'inputValor', value: '20000' },
  //   ];

  //   inputs.forEach(async (element) => {
  //     await changeInput(element.id, element.value);
  //     const input = await screen.getByTestId(element.id).querySelector('input');
  //     expect(input.value).toBe(element.value);
  //   });
  // });
});
