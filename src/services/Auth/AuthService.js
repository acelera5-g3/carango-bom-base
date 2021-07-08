const AuthService = {
  login (user) {
    return fetch('http://localhost:3333/usuarios/login', {
      method: 'POST',
      body: JSON.stringify(user),
      timeout: 5000
    })
      .then((r) => r.json())
      .catch((err) => err);
  },
  cadastrar (user) {
    return fetch('http://localhost:3333/usuarios/cadastro', {
      method: 'POST',
      body: JSON.stringify(user),
      timeout: 5000
    })
      .then((r) => r.json())
      .catch((err) => err);
  }
}

export default AuthService;