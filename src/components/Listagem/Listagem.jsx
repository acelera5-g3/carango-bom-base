/* eslint-disable react/display-name */
import { makeStyles, Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import React from 'react';
import PropTypes from 'prop-types';
import SemItens from './SemItens';

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
  const useStyles = makeStyles(() => ({
    actionsToolbar: {
      float: 'right',
    },
    actions: {
      top: '10px',
      marginLeft: '10px',
    },
  }));

  const classes = useStyles();

  return (
      <div style={{ width: '100%' }} data-testid="data-grid">
        <DataGrid
            className={classes.dataTable}
            autoHeight={true}
            rows={linhas}
            columns={colunas}
            onRowSelected={(gridSelection) => onRowSelected(gridSelection.data)}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            components={{
              NoRowsOverlay: SemItens,
            }}
            pagination
            loading={loading}
        />

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
