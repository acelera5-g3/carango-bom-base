import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Route, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import AuthService from '../../../services/Auth/AuthService';
import { Cadastro } from '../index';

describe('Cadastro', () => {
  const changeInput = async (id, value) => {
    const input = screen.getByTestId(id).querySelector('input');
    userEvent.type(input, value);
    fireEvent.blur(input);
  };

  const history = createMemoryHistory();
  history.push('/cadastro');

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
        <Route path="/cadastro">
          <Cadastro />
        </Route>
      </Router>
    );
  });

  it('Deve instanciar o componente', async () => {
    expect(await screen.findByTestId('cadastroForm')).toBeInTheDocument();
  });

  it('Deve mostrar erro ao colocar um e-mail inválido', async () => {
    await changeInput('inputEmail', 'teste Inválido');
    expect(
      await screen.getByText('E-mail informado inválido.')
    ).toBeInTheDocument();
  });

  it('Deve mostrar erro ao colocar uma senha inválida', async () => {
    await changeInput('inputSenha', 'aa');
    expect(
      await screen.getByText('A senha deve possuir ao menos 3 caracteres.')
    ).toBeInTheDocument();
  });

  it('Deve mostrar erro ao colocar a confirmação de senha inválida', async () => {
    await changeInput('inputConfirmacaoSenha', 'aa');
    expect(
      await screen.getByText('A senha deve possuir ao menos 3 caracteres.')
    ).toBeInTheDocument();
  });

  it('Deve mostrar erro ao colocar senhas diferentes', async () => {
    await act(async () => {
      await changeInput('inputSenha', 'aaa');
      await changeInput('inputConfirmacaoSenha', 'aab');
    });
    expect(
      await screen.getByText('As senhas devem ser iguais.')
    ).toBeInTheDocument();
  });

  it('Deve habilitar o botão quando o form estiver preenchido corretamente', async () => {
    await changeInput('inputEmail', 'teste@valido.com');
    await changeInput('inputSenha', 's3nh4v4l1d4#');
    await changeInput('inputConfirmacaoSenha', 's3nh4v4l1d4#');
    expect(
      await screen.getByTestId('submitButton').closest('button')
    ).toBeEnabled();
  });

  it('Deve enviar o Formulário com sucesso', async () => {
    jest.spyOn(AuthService, 'cadastrar').mockResolvedValue({
      id: 1,
      email: 'teste@teste.com',
    });
    await changeInput('inputEmail', 'teste@valido.com');
    await changeInput('inputSenha', 's3nh4v4l1d4#');
    await changeInput('inputConfirmacaoSenha', 's3nh4v4l1d4#');
    const button = screen.getByTestId('submitButton');
    await act(async () => {
      fireEvent.click(button);
    });
    expect(AuthService.cadastrar).toHaveBeenCalled();
    expect(pushSpy).toHaveBeenCalledWith('/usuarios');
  });

  it('Deve dar erro ao enviar o formulário', async () => {
    jest.setTimeout(7000);
    jest.spyOn(AuthService, 'cadastrar').mockRejectedValue({
      status: 409,
    });
    await changeInput('inputEmail', 'teste@valido.com');
    await changeInput('inputSenha', 's3nh4v4l1d4#');
    await changeInput('inputConfirmacaoSenha', 's3nh4v4l1d4#');
    const button = screen.getByTestId('submitButton');
    await act(async () => {
      fireEvent.click(button);
    });
    expect(AuthService.cadastrar).toHaveBeenCalled();
    expect(
      await screen.getByText('Erro ao cadastrar o usuário!')
    ).toBeInTheDocument();
  });

  it('Deve voltar para /usuarios ao clicar no botão de voltar', async () => {
    const button = screen.getByTestId('voltarButton');
    fireEvent.click(button);

    expect(pushSpy).toHaveBeenCalledWith('/usuarios');
  });
});
