import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import VeiculoService from '../../../services/Veiculo/VeiculoService';
import Listagem from '../../../components/Listagem';

const colunas = [
  { field: 'marca', headerName: 'Marca', width: 200 },
  { field: 'modelo', headerName: 'Modelo', width: 200 },
  { field: 'ano', headerName: 'Ano', width: 200 },
  {
    field: 'valor',
    headerName: 'Valor',
    width: 200,
    valueFormatter: (params) => {
      const valueFormatted = Number(params.value).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      });
      return valueFormatted;
    },
  },
];

const ListagemVeiculos = () => {
  const [veiculos, setVeiculos] = useState([]);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState();
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  function alterar() {
    if (veiculoSelecionado) {
      history.push(`/alteracao-veiculos/${veiculoSelecionado?.id}`);
    }
  }

  function excluir() {
    setLoading(true);
    VeiculoService.excluir(veiculoSelecionado)
      .then(() => {
        setVeiculoSelecionado(null);
        carregarVeiculos();
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => carregarVeiculos(), []);

  function carregarVeiculos() {
    VeiculoService.listar()
      .then((dados) => {
        const listaVeiculos = dados?.content?.map((veiculo) => {
          const { id, modelo, ano, valor, marca } = veiculo;
          return { id, modelo, ano, valor, marca: marca.nome };
        });
        setVeiculos(listaVeiculos);
      })
      .finally(() => setLoading(false));
  }

  return (
    <Listagem
      alterar={alterar}
      excluir={excluir}
      incluir={() => history.push('/cadastro-veiculos')}
      colunas={colunas}
      linhas={veiculos}
      rowSelected={veiculoSelecionado}
      onRowSelected={setVeiculoSelecionado}
      loading={loading}
    />
  );
};

export default ListagemVeiculos;
