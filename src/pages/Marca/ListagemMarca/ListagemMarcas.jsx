import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MarcaService from '../../../services/Marca/MarcaService';
import Listagem from '../../../components/Listagem';

const colunas = [{ field: 'nome', headerName: 'Marca', width: 200 }];

const ListagemMarcas = () => {
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marcaSelecionada, setMarcaSelecionada] = useState();
  const history = useHistory();

  function excluir() {
    setLoading(true);
    MarcaService.excluir(marcaSelecionada)
      .then(() => {
        setMarcaSelecionada(null);
        carregarMarcas();
      })
      .finally(() => setLoading(false));
  }

  // eslint-disable-next-line
  useEffect(() => carregarMarcas(), []);

  function carregarMarcas() {
    MarcaService.listar()
      .then((dados) => {
        setMarcas(dados.content);
      })
      .finally(() => setLoading(false));
  }

  function alterar() {
    if (marcaSelecionada) {
      history.push(`/alteracao-marca/${marcaSelecionada?.id}`);
    }
  }

  return (
    <Listagem
      alterar={alterar}
      excluir={excluir}
      incluir={() => history.push('/cadastro-marca')}
      colunas={colunas}
      linhas={marcas}
      rowSelected={marcaSelecionada}
      onRowSelected={setMarcaSelecionada}
      loading={loading}
    />
  );
};

export default ListagemMarcas;
