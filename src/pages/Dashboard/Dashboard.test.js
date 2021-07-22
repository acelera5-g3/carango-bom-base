import { act, render, screen } from '@testing-library/react';
import Dashboard from '.';
import DashboardService from '../../services/Dashboard/DashboardService';

describe('Drawer', () => {
  it('deve renderizar a Dashboard com sucesso', async () => {
    await act(async () => {
      render(<Dashboard />);
    });
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  });

  it('deve renderizar a mensagem quando nao ha marcas', async () => {
    jest.spyOn(DashboardService, 'listar').mockClear().mockResolvedValue([]);
    await act(async () => {
      render(<Dashboard />);
    });
    expect(screen.getByText('Não há marcas cadastradas')).toBeInTheDocument();
  });

  // it('deve renderizar as marcas na dashboard', async () => {
  //   jest
  //     .spyOn(DashboardService, 'listar')
  //     .mockClear()
  //     .mockResolvedValue({
  //       content: [
  //         {
  //           nomeMarca: 'PEUGEOUT',
  //           idMarca: 80,
  //           somatoria: 200000,
  //           quantidade: 0,
  //         },
  //       ],
  //     });
  //   await act(async () => {
  //     render(<Dashboard />);
  //   });
  //   expect(await screen.getByText('PEUGEOUT')).toBeInTheDocument();
  // });
});
