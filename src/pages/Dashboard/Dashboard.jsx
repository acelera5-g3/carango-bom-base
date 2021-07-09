import { CardContent, Card, Typography, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import MarcaService from '../../services/Marca/MarcaService';

export default function Dashboard() {
  const useStyles = makeStyles({
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    root: {
      minWidth: '400px',
      marginBottom: 20,
    },
    pos: {
      marginBottom: 12,
    },
    [`@media (max-width: 768px)`]: {
      root: {
        minWidth: '100%',
      },
    },
  });

  const [listaMarcas, setListaMarcas] = useState([]);
  const classes = useStyles();

  useEffect(() => carregarMarcas(), []);

  function carregarMarcas() {
    MarcaService.listar().then((dados) => setListaMarcas(dados));
  }

  return (
    <div className={classes.container} data-testid="dashboard">
      {listaMarcas && listaMarcas.length ? (
        listaMarcas.map((marca) => (
          <Card className={classes.root} key={marca.id}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {marca.nome}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {marca.quantidade} veículo(s)
              </Typography>
              <Typography variant="body2" component="p">
                Valor total dos veículos: <b>{marca.valorTotal}</b>
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>Não há marcas cadastradas</p>
      )}
    </div>
  );
}
