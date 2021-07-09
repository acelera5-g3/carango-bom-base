import React from 'react';
import { Container, CssBaseline, makeStyles } from '@material-ui/core';
import { ptBR } from '@material-ui/core/locale';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import CadastroMarca from './pages/CadastroMarca';
import ListagemMarcas from './pages/ListagemMarca';
import MenuLateral from './components/MenuLateral/MenuLateral.jsx';
import './App.css';
import { Login, Cadastro } from './pages/Usuarios';
import ListagemUsuario from './pages/ListagemUsuario';
import ListagemVeiculos from './pages/ListagemVeiculos';
import Dashboard from './pages/Dashboard';

const muiTheme = createMuiTheme(
  {
    palette: {
      primary: {
        main: '#333333',
      },
      secondary: {
        main: '#EFF0F2',
      },
    },
  },
  ptBR
);

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Router>
      <ThemeProvider theme={muiTheme}>
        <div className={classes.root}>
          <CssBaseline />
          <MenuLateral className={classes.content}>
            <Container component="article" maxWidth="md">
              <Switch>
                <Route path="/cadastro-marca">
                  <CadastroMarca />
                </Route>
                <Route path="/alteracao-marca/:id">
                  <CadastroMarca />
                </Route>
                <Route path="/cadastro-usuario">
                  <CadastroMarca />
                </Route>
                <Route path="/alteracao-usuario/:id">
                  <CadastroMarca />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/cadastro">
                  <Cadastro />
                </Route>
                <Route path="/usuarios">
                  <ListagemUsuario />
                </Route>
                <Route path="/veiculos">
                  <ListagemVeiculos />
                </Route>
                <Route path="/dashboard">
                  <Dashboard />
                </Route>
                <Route exact path="/">
                  <ListagemMarcas />
                </Route>
              </Switch>
            </Container>
          </MenuLateral>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
