const UsuarioService = {
  cadastrar(usuario) {
    return fetch('http://localhost:3333/usuarios', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(usuario),
    }).then((r) => r.json());
  },

  alterar(usuario) {
    return fetch(`http://localhost:3333/usuarios/${usuario.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(usuario),
    }).then((r) => r.json());
  },

  consultar(id) {
    return fetch(`http://localhost:3333/usuarios/${id}`).then((r) => r.json());
  },

  listar() {
    return fetch('http://localhost:3333/usuarios').then((r) => r.json());
  },

  excluir(usuario) {
    return fetch(`http://localhost:3333/usuarios/${usuario.id}`, {
      method: 'DELETE',
    }).then((r) => r.json());
  },
};

export default UsuarioService;
