import { Button, Fab, makeStyles } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MarcaService from '../services/Marca/MarcaService';

const colunas = [
  { field: 'nome', headerName: 'Marca', width: 200 },
];

const useStyles = makeStyles(() => ({
  fab: {
    position: 'absolute',
    bottom: '100px',
    right: '100px',
  },
  actionsToolbar: {
    float: 'right',
  },
  actions: {
    top: '10px',
    marginLeft: '10px',
  },
}));

const ListagemMarcas = () => {
  const [marcas, setMarcas] = useState([]);
  const [marcaSelecionada, setMarcaSelecionada] = useState();
  const classes = useStyles();
  const history = useHistory();

  console.log(marcas);
  function alterar() {
    history.push(`/alteracao-marca/${marcaSelecionada.id}`);
  }

  function excluir() {
    MarcaService.excluir(marcaSelecionada)
      .then(() => {
        setMarcaSelecionada(null);
        carregarMarcas();
      });
  }

  // TODO: Avaliar remover disable na próxima linha
  // eslint-disable-next-line
    useEffect(() => carregarMarcas(), []);

  function carregarMarcas() {
    MarcaService.listar()
      .then((dados) => setMarcas(dados));
  }

  return (
        <div style={{ height: 300, width: '100%' }} data-testid="data-grid"
        >
            <DataGrid rows={marcas} columns={colunas}
                onRowSelected={(gridSelection) => setMarcaSelecionada(gridSelection.data)}
            />

            <div className={classes.actionsToolbar}>
                <Button
                    className={classes.actions}
                    variant="contained"
                    color="secondary"
                    disabled={!marcaSelecionada}
                    data-testid="botao-excluir"
                    onClick={() => excluir()}>
                    Excluir
                </Button>
                <Button
                    className={classes.actions}
                    variant="contained"
                    color="primary"
                    disabled={!marcaSelecionada}
                    onClick={() => alterar()}>
                    Alterar
                </Button>
            </div>

            <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => history.push('/cadastro-marca')}>
                <AddIcon />
            </Fab>
        </div>
  );
};

export default ListagemMarcas;
