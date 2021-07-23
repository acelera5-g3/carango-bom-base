import {
  Button,
  TextField,
  Snackbar,
  NativeSelect,
  FormHelperText,
  Box,
  makeStyles,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import MarcaService from '../../../services/Marca/MarcaService';
import VeiculoService from '../../../services/Veiculo/VeiculoService';
import { validarPreenchimento } from '../../Usuarios/validacoes';
import useErros from '../../../hooks/useErros';

const useStyles = makeStyles(() => ({
  formControl: {
    width: '100%',
  },
  boxBtns: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: '1rem',
  },
}));

const CadastroVeiculos = () => {
  const classes = useStyles();

  const [marcas, setMarcas] = useState([]);
  const [veiculo, setVeiculo] = useState({
    marca: { id: 0, nome: '' },
    modelo: '',
    ano: '',
    valor: '',
  });
  const [alert, setAlert] = useState(false);

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    MarcaService.listar().then((values) => {
      setMarcas(values.content);
      if (id) {
        VeiculoService.consultar(id).then((data) => {
          setVeiculo({ ...data });
        });
      }
    });
  }, []);

  const validacoes = {
    marca: (dado) => validarPreenchimento(+dado),
    modelo: (dado) => validarPreenchimento(dado),
    ano: (dado) => validarPreenchimento(dado),
    valor: (dado) => validarPreenchimento(dado),
  };

  const [erros, validarCampos, possoEnviar] = useErros(validacoes);

  return (
    <>
      <form
        data-testid="cadastroVeiculosForm"
        onSubmit={(event) => {
          event.preventDefault();
          if (possoEnviar()) {
            const params = {
              ...veiculo,
            };
            if (id) {
              VeiculoService.alterar({ id, ...params }).then(() => {
                history.push('/veiculos');
              });
              // eslint-disable-next-line brace-style
            } else {
              VeiculoService.cadastrar(params).then(() => {
                history.push('/veiculos');
              });
            }
          }
        }}
      >
        <FormControl
          sx={{ m: 1, minWidth: 80 }}
          className={classes.formControl}
        >
          <label htmlFor="select-input-marca">Marca</label>
          <NativeSelect
            name="marca"
            id="select-input-marca"
            data-testid="select-marca"
            value={veiculo?.marca?.id}
            onBlur={validarCampos}
            error={!erros.marca.valido}
            onChange={(e) =>
              setVeiculo({ ...veiculo, marca: { id: e.target.value } })
            }
          >
            <option value="0">Nenhuma</option>
            {marcas?.map((marca) => (
              <option key={marca.id} value={marca.id} data-testid={marca.nome}>
                {marca.nome}
              </option>
            ))}
          </NativeSelect>
          <FormHelperText>{erros.marca.texto}</FormHelperText>
          <TextField
            value={veiculo?.modelo}
            onChange={(e) => setVeiculo({ ...veiculo, modelo: e.target.value })}
            onBlur={validarCampos}
            helperText={erros.modelo.texto}
            error={!erros.modelo.valido}
            name="modelo"
            id="modelo"
            label="Modelo"
            type="text"
            fullWidth
            required
            margin="normal"
            data-testid="inputModelo"
          />
          <TextField
            value={veiculo?.ano}
            onChange={(e) => setVeiculo({ ...veiculo, ano: e.target.value })}
            onBlur={validarCampos}
            helperText={erros.ano.texto}
            error={!erros.ano.valido}
            name="ano"
            id="ano"
            label="Ano"
            type="number"
            fullWidth
            required
            margin="normal"
            data-testid="inputAno"
          />

          <TextField
            value={veiculo?.valor}
            onChange={(e) => setVeiculo({ ...veiculo, valor: e.target.value })}
            onBlur={validarCampos}
            helperText={erros.valor.texto}
            error={!erros.valor.valido}
            name="valor"
            id="valor"
            label="Valor"
            type="number"
            fullWidth
            required
            margin="normal"
            data-testid="inputValor"
          />

          <Box className={classes.boxBtns}>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              data-testid="voltarButton"
              onClick={() => history.push('/veiculos')}
            >
              Voltar
            </Button>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              data-testid="submitButton"
              disabled={!possoEnviar()}
            >
              Cadastrar
            </Button>
          </Box>
          <Snackbar
            data-testeid="snackbar"
            open={alert}
            autoHideDuration={4000}
            onClose={() => setAlert(!alert)}
          >
            <Alert severity="error" title="Erro!">
              Erro ao cadastrar o usuário!
            </Alert>
          </Snackbar>
        </FormControl>
      </form>
    </>
  );
};

export default CadastroVeiculos;
