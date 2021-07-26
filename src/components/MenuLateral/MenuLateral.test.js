import { fireEvent, render, screen } from '@testing-library/react';
import MenuLateral from './MenuLateral';
import SectionContext from '../../hooks/SectionContext';

describe('Drawer', () => {
  it('deve renderizar o Drawer com sucesso', () => {
    render(
        <SectionContext.Provider value={[true, null]}>
          <MenuLateral />
        </SectionContext.Provider>
    );
    expect(screen.getByTestId('menu-lateral')).toBeInTheDocument();
  });

  it('deve abrir o menu lateral', async () => {
    render(
        <SectionContext.Provider value={[true, null]}>
          <MenuLateral />
        </SectionContext.Provider>
    );
    const toggle = screen.getByTestId('menu-toogle');
    fireEvent.click(toggle);
    expect(screen.getByTestId('drawer')).toBeInTheDocument();
  });
});
