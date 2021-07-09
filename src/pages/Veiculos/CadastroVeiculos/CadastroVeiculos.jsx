import { Button, TextField, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MarcaService from '../../../services/Marca/MarcaService';
// import { confirmarSenha, validarEmail, validarSenha } from '../validacoes';
// import useErros from '../../../hooks/useErros';

const CadastroVeiculos = () => {
  const [marcas, setMarcas] = useState();
  const [modelo, setModelo] = useState('');
  // const [ano, setAno] = useState();
  // const [valor, setValor] = useState('');

  const [alert, setAlert] = useState(false);

  const history = useHistory();

  useEffect(() => {
    MarcaService.listar().then((value) => {
      setMarcas(value);
    });
  }, []);

  // const validacoes = {
  //   email: (dado) => validarEmail(dado),
  //   senha: (dado) => validarSenha(dado),
  //   confirmacaoSenha: (dado) => {
  //     const validacaoSenha = validacoes.senha(dado);
  //     if (!validacaoSenha.valido) {
  //       return validacaoSenha;
  //     }
  //     return confirmarSenha(dado, cadastroSenha);
  //   },
  // };

  // const [erros, validarCampos, possoEnviar] = useErros(validacoes);

  return (
    <>
      <form
        data-testid="cadastroVeiculosForm"
        // onSubmit={async (e) => {
        //   e.preventDefault();
        //   if (possoEnviar()) {
        //     // await AuthService.cadastrar({
        //     //   email: cadastroEmail,
        //     //   senha: cadastroSenha,
        //     // })
        //     //   .then(() => {
        //     //     history.push('/usuarios');
        //     //   })
        //     //   .catch(() => {
        //     //     setAlert(true);
        //     //   });
        //   }
        // }}
      >
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="select-input-marca">Marca</InputLabel>
          <Select
            labelId="select-input-marca"
            id="select-input-marca"
            data-testid="select-marca"
            value={marcas}
            onChange={(value) => setMarcas(value.target.value)}
            autoWidth
            label="Marca"
          >
            <MenuItem value="">
              <em>Nenhuma</em>
            </MenuItem>
            {marcas?.map((marca) => (
              <MenuItem key={marca.id} value={marca.id}>
                {marca.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
          // onBlur={validarCampos}
          // helperText={erros.modelo.texto}
          // error={!erros.modelo.valido}
          name="modelo"
          id="modelo"
          label="Modelo"
          type="text"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          data-testid="inputModelo"
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          data-testid="submitButton"
          // disabled={!possoEnviar()}
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
      </form>
    </>
  );
};

export default CadastroVeiculos;
