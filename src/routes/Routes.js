import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../pages/Dashboard';
import { CadastroMarca, ListagemMarcas } from '../pages/Marca';
import { CadastroUsuario, ListagemUsuario, Login } from '../pages/Usuarios';
import { CadastroVeiculos, ListagemVeiculos } from '../pages/Veiculos';

function Routes() {
  const listaDeRotas = [
    {
      path: '/cadastro-marca',
      component: <CadastroMarca />,
      privada: false,
    },
    {
      path: '/alteracao-marca/:id',
      component: <CadastroMarca />,
      privada: false,
    },
    {
      path: '/cadastro-usuario',
      component: <CadastroUsuario />,
      privada: false,
    },
    {
      path: '/alteracao-usuario/:id',
      component: <CadastroUsuario />,
      privada: false,
    },
    {
      path: '/login',
      component: <Login />,
      privada: false,
    },
    {
      path: '/usuarios',
      component: <ListagemUsuario />,
      privada: false,
    },
    {
      path: '/veiculos',
      component: <ListagemVeiculos />,
      privada: false,
    },
    {
      path: '/dashboard',
      component: <Dashboard />,
      privada: false,
    },
    {
      path: '/cadastro-veiculos',
      component: <CadastroVeiculos />,
      privada: false,
    },
    {
      path: '/alteracao-veiculos/:id',
      component: <CadastroVeiculos />,
      privada: false,
    },
    {
      path: '/',
      component: <ListagemMarcas />,
      privada: false,
      exact: true,
    },
  ];

  return listaDeRotas.map((route) => (
    <Route path={route.path} key={route.path} exact={route?.exact}>
      {route.privada ? (
        <PrivateRoute component={route.component} />
      ) : (
        route.component
      )}
    </Route>
  ));
}

export default Routes;
