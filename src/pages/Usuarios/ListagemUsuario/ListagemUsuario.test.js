import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ListagemUsuario from './ListagemUsuario';

describe('ListagemUsuario', () => {
  it('Deve listar os veiculos', () => {
    const { container } = render(<ListagemUsuario />);
    expect(container).toBeDefined();
  });

  it('Deve mostrar lista vazia quando não existir retorno da api', async () => {
    await render(<ListagemUsuario />);
    const check = await screen.getByText('No rows');
    expect(check).toBeInTheDocument();
  });

  it('Deve mostrar lista com itens', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue([{ id: 74, nome: 'Fernando' }]),
    });
    render(<ListagemUsuario />);
    expect(await screen.findByText('Fernando')).toBeInTheDocument();
  });

  it('Deve excluir uma marca', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue([
        { id: 74, nome: 'Marcos' },
        { id: 12, nome: 'Ary' },
      ]),
    });
    render(<ListagemUsuario />);
    const fiatText = await screen.findByText('Ary');
    fireEvent.click(fiatText);
    const botaoExcluir = screen.getByTestId('botao-excluir');
    fireEvent.click(botaoExcluir);
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue([{ id: 74, nome: 'Marcos' }]),
    });
    expect(await screen.findByText('Ary')).not.toBeInTheDocument();
  });
});
