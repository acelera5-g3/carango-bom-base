import { act, render, screen } from '@testing-library/react';
import Dashboard from '.';
import DashboardService from '../../services/Dashboard/DashboardService';

describe('Dashboard', () => {

  const createInstance = () => render(<Dashboard />);

  it('deve renderizar a Dashboard com sucesso', async () => {
    jest.spyOn(DashboardService, 'listar').mockResolvedValue({content: []});
    const { container } = await createInstance();
    expect(container).toBeDefined();
  });


  it('deve renderizar a mensagem quando nao ha marcas', async () => {
    jest.spyOn(DashboardService, 'listar').mockResolvedValue({content: []});
    await act( async () => {
      await createInstance();
    });
    expect(screen.getByText(/Não há marcas cadastradas/i)).toBeInTheDocument();
  });

  
  it('deve renderizar as marcas na dashboard', async () => {
    jest
      .spyOn(DashboardService, 'listar')
      .mockClear()
      .mockResolvedValue({
        content: [
          {
            nomeMarca: "PEUGEOUT",
            idMarca: 80,
            somatoria: 200000,
            quantidade: 0,
          },
        ],
      });
    await act(async () => {
      await createInstance();
    });
    expect(await screen.getByText(/PEUGEOUT/i)).toBeInTheDocument();
  });
});
