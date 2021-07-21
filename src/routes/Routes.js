import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute  from './PrivateRoute';
import Dashboard from '../pages/Dashboard';
import { CadastroMarca, ListagemMarcas } from '../pages/Marca';
import { Cadastro, ListagemUsuario, Login } from '../pages/Usuarios';
import { CadastroVeiculos, ListagemVeiculos } from '../pages/Veiculos';

function Routes() {
  const listaDeRotas = [
    {
      "path": "/cadastro-marca",
      "component" : <CadastroMarca/>,
      "privada": true,
    },
    {
      "path": "/alteracao-marca/:id",
      "component" : <CadastroMarca/>,
      "privada": false,
    },
    {
      "path": "/cadastro-usuario",
      "component" : <CadastroMarca/>,
      "privada": false,
    },
    {
      "path": "/alteracao-usuario/:id",
      "component" : <CadastroMarca/>,
      "privada": true,
    },
    {
      "path": "/login",
      "component" : <Login/>,
      "privada": false,
    },
    {
      "path": "/cadastro",
      "component" : <Cadastro/>,
      "privada": false,
    },
    {
      "path": "/usuarios",
      "component" : <ListagemUsuario/>,
      "privada": true,
    },
    {
      "path": "/veiculos",
      "component" : <ListagemVeiculos/>,
      "privada": false,
    },
    {
      "path": "/dashboard",
      "component" : <Dashboard/>,
      "privada": true,
    },
    {
      "path": "/cadastro-veiculos",
      "component" : <CadastroVeiculos/>,
      "privada": true,
    },
    {
      "path": "/",
      "component" : <ListagemMarcas/>,
      "privada": false,
      "exact": true
    },
  ]


  return (
    listaDeRotas.map(route => {
      if(route.privada){
        return (<PrivateRoute path={route.path} key={route.path} exact={route?.exact} />)
      }
        return (
        <Route path={route.path} key={route.path} exact={route?.exact}>
            {route.component}
        </Route>
      )     
    })
  );
}

export default Routes;