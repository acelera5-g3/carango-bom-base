import { render } from '@testing-library/react';
import React from 'react';
import App from './App';

it('Deve listar os veiculos', () => {
  const { container } = render(<App />);
  expect(container).toBeDefined();
});
