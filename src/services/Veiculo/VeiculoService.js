import request from '../Request/Request';

const VeiculoService = {
  cadastrar(veiculo) {
    return request(
      `${process.env.REACT_APP_API_URL}/apiveiculos`,
      'POST',
      veiculo
    ).then((r) => r.json());
  },

  alterar(veiculo) {
    return request(
      `${process.env.REACT_APP_API_URL}/apiveiculos/${veiculo.id}`,
      'PUT',
      veiculo
    ).then((r) => r.json());
  },

  consultar(id) {
    return request(
      `${process.env.REACT_APP_API_URL}/apiveiculos/${id}`,
      'GET'
    ).then((r) => r.json());
  },

  listar() {
    return request(`${process.env.REACT_APP_API_URL}/apiveiculos`, 'GET').then(
      (r) => r.json()
    );
  },

  excluir(veiculo) {
    return request(
      `${process.env.REACT_APP_API_URL}/apiveiculos/${veiculo.id}`,
      'DELETE'
    ).then((r) => r.json());
  },
};

export default VeiculoService;
