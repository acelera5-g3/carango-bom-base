import request from '../Request/Request';

const MarcaService = {
  cadastrar(marca) {
    return request(
      `${process.env.REACT_APP_API_URL}/api/marcas/`,
      'POST',
      marca
    ).then((r) => r.json());
  },

  alterar(marca) {
    return request(
      `${process.env.REACT_APP_API_URL}/api/marcas/${marca.id}`,
      'PUT',
      marca
    ).then((r) => r.json());
  },

  consultar(id) {
    return request(
      `${process.env.REACT_APP_API_URL}/api/marcas/${id}`,
      'GET'
    ).then((r) => r.json());
  },

  listar() {
    return request(`${process.env.REACT_APP_API_URL}/api/marcas`, 'GET').then(
      (r) => r.json()
    );
  },

  excluir(marca) {
    return request(
      `${process.env.REACT_APP_API_URL}/api/marcas/${marca.id}`,
      'DELETE'
    ).then((r) => r.json());
  },
};

export default MarcaService;
