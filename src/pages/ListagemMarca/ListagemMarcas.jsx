import { Button, makeStyles } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import blue from '@material-ui/core/colors/blue';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MarcaService from '../../services/Marca/MarcaService';

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

  function alterar() {
    history.push(`/alteracao-marca/${marcaSelecionada.id}`);
  }

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
    <div style={{ width: '100%' }} data-testid="data-grid">
      <DataGrid
        className={classes.dataTable}
        autoHeight={true}
        rows={marcas}
        columns={colunas}
        onRowSelected={(gridSelection) =>
          setMarcaSelecionada(gridSelection.data)
        }
      />

      <div className={classes.actionsToolbar}>
        <Button
          className={classes.actions}
          variant="contained"
          color="primary"
          data-testid="botao-incluir"
          // disabled={!marcaSelecionada}
          onClick={() => history.push('/cadastro-marca')}
        >
          Incluir
        </Button>
        <Button
          className={classes.actions}
          variant="contained"
          color="primary"
          data-testid="botao-alterar"
          disabled={!marcaSelecionada}
          onClick={() => alterar()}
        >
          Alterar
        </Button>
        <Button
          className={classes.actions}
          variant="contained"
          color="secondary"
          disabled={!marcaSelecionada}
          data-testid="botao-excluir"
          onClick={() => excluir()}
        >
          Excluir
        </Button>
      </div>
    </div>
  );
};

export default ListagemMarcas;
