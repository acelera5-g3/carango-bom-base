import { screen } from '@testing-library/react';
import { changeInput } from './testing';

const testesUsario = (formTestId) => {
  it('Deve instanciar o componente', async () => {
    expect(await screen.findByTestId(formTestId)).toBeInTheDocument();
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
};

// eslint-disable-next-line jest/no-export
export { testesUsario };
