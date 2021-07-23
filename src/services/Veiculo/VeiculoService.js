import request from '../Request/Request';

const VeiculoService = {
  cadastrar(veiculo) {
    return request(
      `${process.env.REACT_APP_API_URL}/api/veiculos`,
      'POST',
      veiculo
    ).then((r) => r.json());
  },

  alterar(veiculo) {
    return request(
      `${process.env.REACT_APP_API_URL}/api/veiculos/${veiculo.id}`,
      'PUT',
      veiculo
    ).then((r) => r.json());
  },

  consultar(id) {
    return request(
      `${process.env.REACT_APP_API_URL}/api/veiculos/${id}`,
      'GET'
    ).then((r) => r.json());
  },

  listar() {
    return request(`${process.env.REACT_APP_API_URL}/api/veiculos`, 'GET').then(
      (r) => r.json()
    );
  },

  excluir(veiculo) {
    return request(
      `${process.env.REACT_APP_API_URL}/api/veiculos/${veiculo.id}`,
      'DELETE'
    ).then((r) => r.json());
  },
};

export default VeiculoService;
