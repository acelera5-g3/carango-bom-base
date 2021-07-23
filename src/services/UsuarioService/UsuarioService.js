import request from '../Request/Request';

const UsuarioService = {
  cadastrar(usuario) {
    return request(
      `${process.env.REACT_APP_API_URL}/apiusuarios/`,
      'POST',
      usuario
    ).then((r) => r.json());
  },

  alterar(usuario) {
    return request(
      `${process.env.REACT_APP_API_URL}/apiusuarios/${usuario.id}`,
      'PUT',
      usuario
    ).then((r) => r.json());
  },

  consultar(id) {
    return request(
      `${process.env.REACT_APP_API_URL}/apiusuarios/${id}`,
      'GET'
    ).then((r) => r.json());
  },

  listar() {
    return request(`${process.env.REACT_APP_API_URL}/apiusuarios`, 'GET').then(
      (r) => r.json()
    );
  },

  excluir(usuario) {
    return request(
      `${process.env.REACT_APP_API_URL}/apiusuarios/${usuario.id}`,
      'DELETE'
    ).then((r) => r.json());
  },
};

export default UsuarioService;
