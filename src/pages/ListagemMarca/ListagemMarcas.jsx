import blue from '@material-ui/core/colors/blue';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MarcaService from '../../services/Marca/MarcaService';
import Listagem from '../../components/Listagem';
import { makeStyles } from "@material-ui/core/styles";

const colunas = [{ field: 'nome', headerName: 'Marca', width: 200 }];

const useStyles = makeStyles(() => ({
  actionsToolbar: {
    float: 'right',
  },
  actions: {
    top: '10px',
    marginLeft: '10px',
  },
  dataTable: {
    MuiDataGridColCellWrapper: {
      background: blue[900],
    },
  },
}));

const ListagemMarcas = () => {
  const [marcas, setMarcas] = useState([]);
  const [marcaSelecionada, setMarcaSelecionada] = useState();
  const classes = useStyles();
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
      alterar={() => history.push(`/alteracao-marca/${marcaSelecionada.id}`)}
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
