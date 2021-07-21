import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UsuarioService from '../../../services/UsuarioService/UsuarioService';
import Listagem from '../../../components/Listagem';

const colunas = [{ field: 'email', headerName: 'E-mail', width: 200 }];

const ListagemUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState();
  const history = useHistory();

  function alterar() {
    if (usuarioSelecionado) {
      history.push(`/alteracao-usuario/${usuarioSelecionado?.id}`);
    }
  }

  function excluir() {
    UsuarioService.excluir(usuarioSelecionado).then(() => {
      setUsuarioSelecionado(null);
      carregarUsuarios();
    });
  }

  // eslint-disable-next-line
  useEffect(() => carregarUsuarios(), []);

  function carregarUsuarios() {
    UsuarioService.listar().then((dados) => setUsuarios(dados.content));
  }

  return (
    <Listagem
      alterar={alterar}
      excluir={excluir}
      incluir={() => history.push('/cadastro-usuario')}
      colunas={colunas}
      linhas={usuarios}
      rowSelected={usuarioSelecionado}
      onRowSelected={setUsuarioSelecionado}
    />
  );
};

export default ListagemUsuario;
