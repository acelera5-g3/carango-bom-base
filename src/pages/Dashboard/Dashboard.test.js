import { act, render, screen } from '@testing-library/react';
import Dashboard from '.';
import MarcaService from '../../services/Marca/MarcaService';

describe('Drawer', () => {
  it('deve renderizar a Dashboard com sucesso', async () => {
    await act(async () => {
      render(<Dashboard />);
    });
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  });

  it('deve renderizar a mensagem quando nao ha marcas', async () => {
    jest.spyOn(MarcaService, 'listar').mockClear().mockResolvedValue([]);
    await act(async () => {
      render(<Dashboard />);
    });
    expect(screen.getByText('Não há marcas cadastradas')).toBeInTheDocument();
  });

  it('deve renderizar as marcas', async () => {
    jest
      .spyOn(MarcaService, 'listar')
      .mockClear()
      .mockResolvedValue([
        {
          nome: 'PEUGEOUT',
          id: 80,
          valorTotal: 'R$ 0,00',
          quantidade: 0,
        },
      ]);
    await act(async () => {
      render(<Dashboard />);
    });
    expect(await screen.getByText('PEUGEOUT')).toBeInTheDocument();
  });
});
