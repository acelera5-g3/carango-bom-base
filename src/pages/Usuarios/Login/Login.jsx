import {
  Button,
  TextField,
  Snackbar,
  Box,
  makeStyles,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useErros from '../../../hooks/useErros';
import AuthService from '../../../services/Auth/AuthService';
import { validarEmail, validarSenha } from '../validacoes';
import SectionContext from '../../../hooks/SectionContext';

const useStyles = makeStyles(() => ({
  title: {
    fontSize: '2rem',
    paddingBottom: '20px',
  },
  boxBtns: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
  },
}));

const Login = () => {
  const [_, setTempermission] = useContext(SectionContext);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [alert, setAlert] = useState(false);

  const history = useHistory();
  const classes = useStyles();

  const validacoes = {
    email: (dado) => validarEmail(dado),
    senha: (dado) => validarSenha(dado),
  };

  const [erros, validarCampos, possoEnviar] = useErros(validacoes);

  return (
    <form
      data-testid="loginForm"
      onSubmit={async (e) => {
        e.preventDefault();
        if (possoEnviar()) {
          await AuthService.login({
            email,
            senha,
          })
            .then((res) => {
              const { token } = res;
              localStorage.setItem('token', token);

              if (token) {
                setTempermission(true);
                history.push('/dashboard');
              }
            })
            .catch(() => {
              setAlert(true);
            });
        }
      }}
    >
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={validarCampos}
        helperText={erros.email.texto}
        error={!erros.email.valido}
        name="email"
        id="email"
        label="E-mail"
        type="email"
        variant="outlined"
        fullWidth
        required
        margin="normal"
        data-testid="inputEmail"
      />
      <TextField
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        onBlur={validarCampos}
        helperText={erros.senha.texto}
        error={!erros.senha.valido}
        name="senha"
        id="senha"
        label="Senha"
        type="password"
        variant="outlined"
        fullWidth
        required
        margin="normal"
        data-testid="inputSenha"
      />
      <Box className={classes.boxBtns}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          data-testid="submitButton"
          disabled={!possoEnviar()}
        >
          Entrar
        </Button>
        <Button
          variant="contained"
          color="primary"
          data-testid="cadastroButton"
          disabled={!possoEnviar()}
          onClick={() => history.push('/cadastro-usuario')}
        >
          Cadastrar-se
        </Button>
      </Box>
      <Snackbar
        data-testeid="snackbar"
        open={alert}
        autoHideDuration={4000}
        onClose={() => setAlert(!alert)}
      >
        <Alert severity="error" title="Erro!">
          Erro ao logar!
        </Alert>
      </Snackbar>
    </form>
  );
};

export default Login;
