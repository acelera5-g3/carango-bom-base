function validarEmail(dado) {
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(dado)) {
    return { valido: true };
  }

  return { valido: false, texto: 'E-mail informado inválido.' };
}

function validarSenha(dado) {
  if (dado && dado.length >= 3) {
    return { valido: true };
  }
  return {
    valido: false,
    texto: 'A senha deve possuir ao menos 3 caracteres.',
  };
}

function confirmarSenha(dado, senha) {
  if (dado !== senha) {
    return {
      valido: false,
      texto: 'As senhas devem ser iguais.',
    }
  }
  return {
    valido: true,
  };
}

function validarPreenchimento(dado){
  if(dado){
    return {
      valido: true, 
    }
  }

  return {
    valido: false,
    texto: 'O campo deve ser preenchido',
  };
}

export { validarEmail, validarSenha, confirmarSenha, validarPreenchimento };