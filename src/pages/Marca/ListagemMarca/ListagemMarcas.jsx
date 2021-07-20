import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MarcaService from '../../../services/Marca/MarcaService';
import Listagem from '../../../components/Listagem';

const colunas = [{ field: 'nome', headerName: 'Marca', width: 200 }];

const ListagemMarcas = () => {
  const [marcas, setMarcas] = useState([]);
  const [marcaSelecionada, setMarcaSelecionada] = useState();
  const history = useHistory();

  function excluir() {
    MarcaService.excluir(marcaSelecionada).then(() => {
      setMarcaSelecionada(null);
      carregarMarcas();
    });
  }

  // eslint-disable-next-line
  useEffect(() => carregarMarcas(), []);

  function carregarMarcas() {
    MarcaService.listar().then((dados) => setMarcas(dados));
  }

  return (
    <Listagem
      alterar={() => {
        marcaSelecionada
          ? history.push(`/alteracao-marca/${marcaSelecionada?.id}`)
          : null;
      }}
      excluir={excluir}
      incluir={() => history.push('/cadastro-marca')}
      colunas={colunas}
      linhas={marcas}
      rowSelected={marcaSelecionada}
      onRowSelected={setMarcaSelecionada}
    />
  );
};

export default ListagemMarcas;
