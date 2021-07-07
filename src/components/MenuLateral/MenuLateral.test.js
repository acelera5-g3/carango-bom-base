import { fireEvent, render, screen } from '@testing-library/react';
import MenuLateral from './MenuLateral';

describe('Drawer', () => {
  it('deve renderizar o Drawer com sucesso', () => {
    render(<MenuLateral />);
    expect(screen.getByTestId('menu-lateral')).toBeInTheDocument();
  });

  it('deve abrir o menu lateral', async () => {
    render(<MenuLateral />);
    const toggle = screen.getByTestId('menu-toogle');
    fireEvent.click(toggle);
    expect(screen.getByTestId('drawer')).toBeInTheDocument();
  });
});
