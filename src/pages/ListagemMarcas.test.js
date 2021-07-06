import React from 'react';
import { render } from '@testing-library/react';
import ListagemMarcas from './ListagemMarcas';

describe('ListagemMarcas', () => {
  it(('Deve listar os veiculos'), () => {
    const { container } = render(<ListagemMarcas/>);
    expect(container).toBeDefined();
  });
});
