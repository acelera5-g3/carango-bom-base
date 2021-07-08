import React from 'react';
import {act, fireEvent, render, screen} from "@testing-library/react";
import {Route, Router} from "react-router-dom";
import userEvent from "@testing-library/user-event";
import {createMemoryHistory} from "history";
import AuthService from "../../services/Auth/AuthService";
import {Login} from ".";

describe('Login', () => {

    const changeInput = async (id, value) => {
        const input = screen.getByTestId(id).querySelector('input');
        userEvent.type(input, value);
        fireEvent.blur(input);
    }

    const history = createMemoryHistory();
    history.push('/login');

    let pushSpy;

    beforeEach(() => {
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useHistory: () => ({
                push: jest.fn(),
            }),
        }));
        pushSpy = jest.spyOn(history, 'push');
    });
    beforeEach(() => {
        render(
            <Router history={history}>
                <Route path='/login'>
                    <Login/>
                </Route>
            </Router>
        );
    });

    it('Deve instanciar o componente', async () => {
        expect(await screen.findByTestId('loginForm')).toBeInTheDocument();
    });

    it('Deve mostrar erro ao colocar um e-mail inválido', async () => {
        await changeInput('inputEmail', 'teste Inválido');
        expect(await screen.getByText('E-mail informado inválido.')).toBeInTheDocument();
    });

    it('Deve mostrar erro ao colocar uma senha inválida', async () => {
        await changeInput('inputSenha', 'aa');
        expect(await screen.getByText('A senha deve possuir ao menos 3 caracteres.')).toBeInTheDocument();
    });

    it('Deve habilitar o botão quando o form estiver preenchido corretamente', async () => {
        await changeInput('inputEmail', 'teste@valido.com');
        await changeInput('inputSenha', 's3nh4v4l1d4#');
        expect(await screen.getByTestId('submitButton')).toBeEnabled();
    });

    it('Deve enviar o Formulário com sucesso', async () => {
        jest.spyOn(AuthService, 'login').mockResolvedValue({
            token: 'TOKENJWT'
        });
        await changeInput('inputEmail', 'teste@valido.com');
        await changeInput('inputSenha', 's3nh4v4l1d4#');
        const button = screen.getByTestId('submitButton');
        await act( async () => {
            fireEvent.click(button);
        });
        expect(AuthService.login).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith('/dashboard');
    });

    it('Deve dar erro ao enviar o formulário', async () => {
        jest.spyOn(AuthService, 'login').mockRejectedValue({
            status: "401"
        });
        await changeInput('inputEmail', 'teste@valido.com');
        await changeInput('inputSenha', 's3nh4v4l1d4#');
        const button = screen.getByTestId('submitButton');
        await act( async () => {
            fireEvent.click(button);
        });
        expect(AuthService.login).toHaveBeenCalled();
        expect(await screen.getByText('Erro ao logar!')).toBeInTheDocument();
    });


});