import {
  Button,
  TextField,
  Snackbar,
  NativeSelect,
  FormHelperText,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import MarcaService from '../../../services/Marca/MarcaService';
import { validarPreenchimento } from '../../Usuarios/validacoes';
import useErros from '../../../hooks/useErros';

const CadastroVeiculos = () => {
  const [marcas, setMarcas] = useState([]);
  const [marcaSelecionada, setMarcaSelecionada] = useState('0');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [valor, setValor] = useState('');
  const [alert, setAlert] = useState(false);

  const history = useHistory();

  useEffect(() => {
    MarcaService.listar().then((values) => {
      setMarcas(values.content);
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
      <form data-testid="cadastroVeiculosForm">
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <label htmlFor="select-input-marca">Marca</label>
          <NativeSelect
            name="marca"
            id="select-input-marca"
            data-testid="select-marca"
            value={marcaSelecionada}
            onBlur={validarCampos}
            error={!erros.marca.valido}
            onChange={(value) => setMarcaSelecionada(value.target.value)}
          >
            <option value="0">Nenhuma</option>
            {marcas?.map((marca) => (
              <option key={marca.id} value={marca.id}>
                {marca.nome}
              </option>
            ))}
          </NativeSelect>
          <FormHelperText>{erros.marca.texto}</FormHelperText>
          <TextField
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
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
            value={ano}
            onChange={(e) => setAno(e.target.value)}
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
            value={valor}
            onChange={(e) => setValor(e.target.value)}
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

          <Button
            variant="contained"
            color="primary"
            type="submit"
            data-testid="submitButton"
            disabled={!possoEnviar()}
          >
            Cadastrar
          </Button>

          <Button
            variant="contained"
            color="secondary"
            type="submit"
            data-testid="voltarButton"
            onClick={() => history.push('/usuarios')}
          >
            Voltar
          </Button>

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
