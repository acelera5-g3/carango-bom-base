import React from 'react';
import {act, fireEvent, render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from "history";
import ListagemMarcas from './ListagemMarcas';
import MarcaService from '../../../services/Marca/MarcaService';

describe('ListagemMarcas', () => {
    const history = createMemoryHistory();

    const createInstance = () => render(
        <Router history={history}>
            <ListagemMarcas/>
        </Router>);

    beforeEach(() => {
        jest.spyOn(MarcaService, 'listar')
            .mockClear()
            .mockResolvedValue({
                content: [
                    {id: 1, nome: 'CHEVROLET'},
                    {id: 2, nome: 'FIAT'},
                ],
            });
    });

    it('Deve instanciar o componente com marcas', async () => {
        await act(async () => {
            await createInstance();
        });
        expect(await screen.findByText(/CHEVROLET/i)).toBeInTheDocument();
    });

    it('Deve alterar uma marca', async () => {

        await act(async () => {
            await createInstance();
            fireEvent.click(await screen.findByText(/FIAT/i));
            fireEvent.click(screen.getByTestId('botao-alterar'));
        });

        expect(history.location.pathname).toBe('/alteracao-marca/2');
    });

    it('Deve excluir uma marca', async () => {
        jest
            .spyOn(MarcaService, 'excluir')
            .mockResolvedValue({id: 2, nome: 'TEST 2'});
        jest
            .spyOn(MarcaService, 'listar')
            .mockClear()
            .mockResolvedValueOnce({
                content: [
                    {id: 1, nome: 'CHEVROLET'},
                    {id: 2, nome: 'FIAT'},
                ],
            })
            .mockResolvedValue({content: [{id: 1, nome: 'CHEVROLET'}]});

        await act(async () => {
            await createInstance();

            const fiatText = await screen.findByText('FIAT');
            const botaoExcluir = screen.getByTestId('botao-excluir');

            fireEvent.click(fiatText);
            fireEvent.click(botaoExcluir);
        });

        expect(await screen.queryByText(/FIAT/i)).not.toBeInTheDocument();
    });

    it('Deve cadastrar uma marca', async () => {
        const history = createMemoryHistory();
        await act(async () => {
            const {getByTestId} = render(
                <Router history={history}>
                    <ListagemMarcas/>
                </Router>);
            fireEvent.click(getByTestId('botao-incluir'));
        });
        expect(history.location.pathname).toBe('/cadastro-marca');
    });
});
