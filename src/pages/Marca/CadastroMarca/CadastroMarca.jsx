import { useHistory, useParams } from 'react-router-dom';
import {
  Button,
  makeStyles,
  TextField,
  Typography,
  Box,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useErros from '../../../hooks/useErros';
import MarcaService from '../../../services/Marca/MarcaService';

const useStyles = makeStyles(() => ({
  title: {
    fontSize: '2rem',
    paddingBottom: '20px',
  },
  boxBtns: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: '1rem',
  },
}));

function CadastroMarca() {
  const [marca, setMarca] = useState('');

  const classes = useStyles();

  const history = useHistory();

  const { id } = useParams();

  const validacoes = {
    marca: (dado) => {
      if (dado && dado.length >= 3) {
        return { valido: true };
      }

      return { valido: false, texto: 'Marca deve ter ao menos 3 letras.' };
    },
  };

  const [erros, validarCampos, possoEnviar] = useErros(validacoes);

  function cancelar() {
    history.push('/');
  }

  useEffect(() => {
    if (id) {
      MarcaService.consultar(id).then((m) => setMarca(m.nome));
    }
  }, [id]); // eslint-disable-line

  return (
    <>
      <Typography variant="h1" className={classes.title}>
        {id ? 'Alterar Cadastro' : 'Cadastrar'}
      </Typography>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (possoEnviar()) {
            if (id) {
              MarcaService.alterar({ id, nome: marca }).then(() => {
                history.push('/');
              });
              // eslint-disable-next-line brace-style
            } else {
              MarcaService.cadastrar({ nome: marca }).then(() => {
                setMarca('');
                history.push('/');
              });
            }
          }
        }}
      >
        <TextField
          value={marca}
          onChange={(evt) => setMarca(evt.target.value)}
          onBlur={validarCampos}
          helperText={erros.marca.texto}
          error={!erros.marca.valido}
          name="marca"
          id="marca"
          label="Marca"
          type="text"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          data-testid="inputMarca"
        />
        <Box className={classes.boxBtns}>
          <Button
            className={classes.btnCancelar}
            variant="contained"
            color="secondary"
            data-testid="cancelarButton"
            onClick={cancelar}
          >
            Cancelar
          </Button>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            data-testid="submitButton"
            disabled={!possoEnviar()}
          >
            {id ? 'Alterar' : 'Cadastrar'}
          </Button>
        </Box>
      </form>
    </>
  );
}

export default CadastroMarca;
