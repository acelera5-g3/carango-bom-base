import { act, render, screen } from '@testing-library/react';
import React from 'react';
import Listagem from './Listagem';

describe('Listagem', () => {
  const createInstance = async (linhas, colunas, selectedSpy) => {
    await act(async () => {
      await render(
        <Listagem
          linhas={linhas || [{ id: 1, content: 'linha' }]}
          colunas={colunas || [{ field: 'nome', headerName: 'Coluna' }]}
          onRowSelected={selectedSpy}
        />
      );
    });
  };

  it('deve renderizar o componente com itens', async () => {
    await createInstance(null, null);
    expect(await screen.findByText('Coluna')).toBeInTheDocument();
  });
  it('deve renderizar o componente sem itens', async () => {
    await createInstance([], []);
    expect(screen.queryByText('Coluna')).toBeNull();
  });
});
