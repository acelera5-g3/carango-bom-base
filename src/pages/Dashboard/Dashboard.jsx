import { CardContent, Card, Typography, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import DashboardService from '../../services/Dashboard/DashboardService';

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

  const [listaDashboard, setListaDashboard] = useState([]);
  const classes = useStyles();

  useEffect(() => carregarDashboard(), []);

  function carregarDashboard() {
    DashboardService.listar().then((dados) => setListaDashboard(dados.content));
  }

  return (
    <div className={classes.container} data-testid="dashboard">
      {listaDashboard && listaDashboard.length ? (
        listaDashboard.map((lista) => (
          <Card className={classes.root} key={lista.idMarca}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {lista.nomeMarca}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {lista.quantidade} veículo(s)
              </Typography>
              <Typography variant="body2" component="p">
                Valor total dos veículos:
                <b style={{ paddingLeft: 3 }}>
                  {lista.somatoria.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </b>
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
