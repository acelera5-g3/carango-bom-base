const VeiculoService = {
  cadastrar(veiculo) {
    return fetch('http://localhost:3333/veiculos', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(veiculo),
    }).then((r) => r.json());
  },

  alterar(veiculo) {
    return fetch(`http://localhost:3333/veiculos/${veiculo.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(veiculo),
    }).then((r) => r.json());
  },

  consultar(id) {
    return fetch(`http://localhost:3333/veiculos/${id}`).then((r) => r.json());
  },

  listar() {
    return fetch('http://localhost:3333/veiculos').then((r) => r.json());
  },

  excluir(veiculo) {
    return fetch(`http://localhost:3333/veiculos/${veiculo.id}`, {
      method: 'DELETE',
    }).then((r) => r.json());
  },
};

export default VeiculoService;
