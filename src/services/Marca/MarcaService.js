const MarcaService = {
  cadastrar(marca) {
    return fetch('http://localhost:3333/marcas/', {
      headers:{ 
        "Content-Type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify(marca),
    }).then((r) => r.json());
  },

  alterar(marca) {
    return fetch(`http://localhost:3333/marcas/${marca.id}`, {
      headers:{ 
        "Content-Type": "application/json"
      },
      method: 'PUT',
      body: JSON.stringify(marca),
    }).then((r) => r.json());
  },

  consultar(id) {
    return fetch(`http://localhost:3333/marcas/${id}`).then((r) => r.json());
  },

  listar() {
    return fetch('http://localhost:3333/marcas').then((r) => r.json());
  },

  excluir(marca) {
    return fetch(`http://localhost:3333/marcas/${marca.id}`, {
      method: 'DELETE',
    })
      .then((r) => r.json());
  },
};

export default MarcaService;
