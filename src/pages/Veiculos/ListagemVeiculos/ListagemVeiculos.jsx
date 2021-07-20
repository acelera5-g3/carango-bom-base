import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import VeiculoService from '../../../services/Veiculo/VeiculoService';
import Listagem from '../../../components/Listagem';

const colunas = [
  { field: 'marca', headerName: 'Marca', width: 200 },
  { field: 'modelo', headerName: 'Modelo', width: 200 },
  { field: 'ano', headerName: 'Ano', width: 200 },
  { field: 'valor', headerName: 'Valor', width: 200 },
];

const ListagemVeiculos = () => {
  const [veiculos, setVeiculos] = useState([]);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState();
  const history = useHistory();

  function alterar() {
    history.push(`/alteracao-veiculo/${veiculoSelecionado?.id}`);
  }

  function excluir() {
    VeiculoService.excluir(veiculoSelecionado).then(() => {
      setVeiculoSelecionado(null);
      carregarVeiculos();
    });
  }

  // eslint-disable-next-line
  useEffect(() => carregarVeiculos(), []);

  function carregarVeiculos() {
    VeiculoService.listar().then((dados) => setVeiculos(dados));
  }

  return (
    <Listagem
      alterar={alterar}
      excluir={excluir}
      incluir={() => history.push('/cadastro-veiculo')}
      colunas={colunas}
      linhas={veiculos}
      rowSelected={veiculoSelecionado}
      onRowSelected={setVeiculoSelecionado}
    />
  );
};

export default ListagemVeiculos;
