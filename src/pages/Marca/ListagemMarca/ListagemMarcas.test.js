import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from "history";
import ListagemMarcas from './ListagemMarcas';
import MarcaService from '../../../services/Marca/MarcaService';

describe('ListagemMarcas', () => {

    beforeEach(() => {
        jest.spyOn(MarcaService, 'listar')
            .mockResolvedValue({
                content: [
                    {id: 1, nome: 'CHEVROLET'},
                    {id: 2, nome: 'FIAT'},
                ],
            });
    });

    it('Deve instanciar o componente COM MARCAS', async () => {
      const { findByText } = render(<ListagemMarcas/>);
      expect(await findByText('CHEVROLET')).toBeInTheDocument();
    });

    /* it('Deve alterar uma marca', async () => {
      const history = createMemoryHistory();
      const { getByTestId, findByText } = render(
          <Router history={history}>
            <ListagemMarcas />
          </Router>);
      const marca = await findByText('FIAT');
      const btnAlterar = getByTestId('botao-alterar');
      fireEvent.click(marca);
      fireEvent.click(btnAlterar);
      expect(history.location.pathname).toBe('/alteracao-marca/2');
    }); */

    // it('Deve excluir uma marca', async () => {
    //   jest
    //     .spyOn(MarcaService, 'excluir')
    //     .mockResolvedValue({ id: 2, nome: 'TEST 2' });
    //   jest
    //     .spyOn(MarcaService, 'listar')
    //     .mockClear()
    //     .mockResolvedValueOnce({
    //       content: [
    //         { id: 1, nome: 'CHEVROLET' },
    //         { id: 2, nome: 'FIAT' },
    //       ],
    //     })
    //     .mockResolvedValue({ content: [{ id: 1, nome: 'CHEVROLET' }] });

    //   render(<ListagemMarcas />);

    //   const fiatText = await screen.findByText('FIAT');
    //   const botaoExcluir = screen.getByTestId('botao-excluir');

    //   fireEvent.click(fiatText);
    //   fireEvent.click(botaoExcluir);

    //   expect(await screen.findByText('FIAT')).not.toBeInTheDocument();
    // });

    it('Deve cadastrar uma marca', async () => {
        const history = createMemoryHistory();
        const { getByTestId } = render(
        <Router history={history}>
          <ListagemMarcas />
        </Router>);
        fireEvent.click(getByTestId('botao-incluir'));
        expect(history.location.pathname).toBe('/cadastro-marca');
    });
});
