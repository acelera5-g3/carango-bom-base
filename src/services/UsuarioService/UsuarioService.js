import request from '../Request/Request';

const UsuarioService = {
  cadastrar(usuario) {
    return request(
      `${process.env.REACT_APP_API_URL}/api/usuarios/`,
      'POST',
      usuario
    ).then((r) => r.json());
  },

  alterar(usuario) {
    return request(
      `${process.env.REACT_APP_API_URL}/api/usuarios/${usuario.id}`,
      'PUT',
      usuario
    ).then((r) => r.json());
  },

  consultar(id) {
    return request(
      `${process.env.REACT_APP_API_URL}/api/usuarios/${id}`,
      'GET'
    ).then((r) => r.json());
  },

  listar() {
    return request(`${process.env.REACT_APP_API_URL}/api/usuarios`, 'GET').then(
      (r) => r.json()
    );
  },

  excluir(usuario) {
    return request(
      `${process.env.REACT_APP_API_URL}/api/usuarios/${usuario.id}`,
      'DELETE'
    ).then((r) => r.json());
  },
};

export default UsuarioService;
