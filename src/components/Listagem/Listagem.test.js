import {render} from '@testing-library/react';
import Listagem from './Listagem';

describe('Listagem', () => {
  const createInstance = (linhas, colunas) => {
    const { container, queryByText, findByText, getByText } = render(
        <Listagem
            linhas={linhas || [{ id: 1, field: 'linha' }]}
            colunas={colunas || [{ field: 'id', headerName: 'ID' },
              {
                field: 'field',
                headerName: 'Coluna'
              }]}
        />
    );
    return { container, queryByText, findByText, getByText };
  };

  it('deve renderizar o componente com itens', async () => {
    const { getByText } = await createInstance(null, null);
    expect(getByText(/linha/i)).toBeInTheDocument();
  });

  it('deve renderizar o componente sem itens', async () => {
    const { getByText } = await createInstance([], []);
    expect(getByText(/Não há itens/i)).toBeInTheDocument();
  });
});
