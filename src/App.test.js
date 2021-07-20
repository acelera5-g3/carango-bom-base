import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('Deve renderizar o app', () => {
    const { container } = render(<App />);
    expect(container).toBeDefined();
  });
});
