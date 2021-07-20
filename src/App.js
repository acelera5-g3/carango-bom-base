import React from 'react';
import { Container, CssBaseline, makeStyles } from '@material-ui/core';
import { ptBR } from '@material-ui/core/locale';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Switch, BrowserRouter as Router } from 'react-router-dom';
import MenuLateral from './components/MenuLateral/MenuLateral.jsx';
import './App.css';
import Routes from './routes/Routes.js';

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
                <Routes />
              </Switch>
            </Container>
          </MenuLateral>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
