import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Route, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { CadastroUsuario } from '../index';
import { changeInput, historyMock, testesUsario } from '../../../tests';
import UsuarioService from '../../../services/UsuarioService/UsuarioService';

describe('Cadastro Usuario', () => {
  const history = createMemoryHistory();
  history.push('/cadastro');

  let pushSpy;

  beforeEach(() => {
    historyMock();
    pushSpy = jest.spyOn(history, 'push');
  });

  beforeEach(() => {
    render(
      <Router history={history}>
        <Route path="/cadastro">
          <CadastroUsuario />
        </Route>
      </Router>
    );
  });

  testesUsario('cadastroForm');

  it('Deve mostrar erro ao colocar a confirmação de senha inválida na tela de Cadastro', async () => {
    await changeInput('inputConfirmacaoSenha', 'aa');
    expect(
      await screen.getByText('A senha deve possuir ao menos 3 caracteres.')
    ).toBeInTheDocument();
  });

  it('Deve mostrar erro ao colocar senhas diferentes na tela de Cadastro', async () => {
    await act(async () => {
      await changeInput('inputSenha', 'aaa');
      await changeInput('inputConfirmacaoSenha', 'aab');
    });
    expect(
      await screen.getByText('As senhas devem ser iguais.')
    ).toBeInTheDocument();
  });

  it('Deve habilitar o botão quando o form estiver preenchido corretamente na tela de Cadastro', async () => {
    await changeInput('inputEmail', 'teste@valido.com');
    await changeInput('inputSenha', 's3nh4v4l1d4#');
    await changeInput('inputConfirmacaoSenha', 's3nh4v4l1d4#');
    expect(
      await screen.getByTestId('submitButton').closest('button')
    ).toBeEnabled();
  });

  it('Deve enviar o Formulário com sucesso na tela de Cadastro', async () => {
    jest.spyOn(UsuarioService, 'cadastrar').mockResolvedValue({
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
    expect(UsuarioService.cadastrar).toHaveBeenCalled();

    expect(pushSpy).toHaveBeenCalledWith('/usuarios');
  });

  it('Deve dar erro ao enviar o formulário na tela de Cadastro', async () => {
    jest.setTimeout(7000);

    jest.spyOn(UsuarioService, 'cadastrar').mockRejectedValue({
      status: 409,
    });

    await changeInput('inputEmail', 'teste@valido.com');
    await changeInput('inputSenha', 's3nh4v4l1d4#');
    await changeInput('inputConfirmacaoSenha', 's3nh4v4l1d4#');

    const button = screen.getByTestId('submitButton');

    await act(async () => {
      fireEvent.click(button);
    });

    expect(UsuarioService.cadastrar).toHaveBeenCalled();

    expect(
      await screen.getByText('Erro ao cadastrar o usuário!')
    ).toBeInTheDocument();
  });

  // it('Deve voltar para /usuarios ao clicar no botão de voltar na tela de Cadastro', async () => {
  //   const button = screen.getByTestId('voltarButton');
  //   fireEvent.click(button);

  //   expect(pushSpy).toHaveBeenCalledWith('/usuarios');
  // });
});
