/* eslint-disable react/display-name */
import { makeStyles, Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import React from 'react';
import PropTypes from 'prop-types';
import SemItens from './SemItens';
import { estaLogado } from '../../utils/auth';


const useStyles = makeStyles(() => ({
  actionsToolbar: {
    float: 'right',
  },
  actions: {
    top: '10px',
    marginLeft: '10px',
  },
  [`@media (max-width: 768px)`]: {
    actionsToolbar: {
      width: '100%',
    },
    actions: {
      width: '100%',
      marginLeft: '0px',
      marginTop: '10px',
    },
  },
}));

function Listagem({
  linhas,
  colunas,
  rowSelected,
  onRowSelected,
  incluir,
  alterar,
  excluir,
  loading,
}) {
  const classes = useStyles();
  const logado = estaLogado();

  return (
    <div style={{ width: '100%' }} data-testid="data-grid">
      <DataGrid
        className={classes.dataTable}
        autoHeight={true}
        rows={linhas}
        columns={colunas}
        onCellClick={(cell) => onRowSelected(cell.row)}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        components={{
          NoRowsOverlay: SemItens,
        }}
        pagination
        loading={loading}
      />
      {logado && (
        <div className={classes.actionsToolbar}>
          <Button
            className={classes.actions}
            variant="contained"
            color="primary"
            data-testid="botao-incluir"
            onClick={incluir}
          >
            Incluir
          </Button>
          <Button
            className={classes.actions}
            variant="contained"
            color="primary"
            data-testid="botao-alterar"
            disabled={!rowSelected}
            onClick={alterar}
          >
            Alterar
          </Button>
          <Button
            className={classes.actions}
            variant="contained"
            color="secondary"
            disabled={!rowSelected}
            data-testid="botao-excluir"
            onClick={excluir}
          >
            Excluir
          </Button>
        </div>
      )}
    </div>
  );
}

Listagem.propTypes = {
  linhas: PropTypes.array,
  colunas: PropTypes.array,
  rowSelected: PropTypes.object,
  onRowSelected: PropTypes.func,
  incluir: PropTypes.func,
  alterar: PropTypes.func,
  excluir: PropTypes.func,
  loading: PropTypes.bool,
};

export default Listagem;
