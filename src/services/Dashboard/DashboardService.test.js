import DashboardService from './DashboardService';

describe('DashboardService', () => {
  it('Deve Chamar a API de Login com sucesso', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => ({
        content: [
          { quantidade: 0, somatoria: 0, nomeMarca: 'VOLVO', idMarca: 3 },
        ],
      }),
    });
    const res = await DashboardService.listar();
    expect(res.content).toBeDefined();
  });
});
