import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ListagemMarcas from './ListagemMarcas';

describe('ListagemMarcas', () => {
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
    const botaoExcluir = screen.getByTestId('botao-excluir');
    fireEvent.click(botaoExcluir);
    expect(await screen.findByText('CHEVROLET')).toBeInTheDocument();
  });
});
