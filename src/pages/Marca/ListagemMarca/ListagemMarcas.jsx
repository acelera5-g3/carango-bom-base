import React, {useEffect, useState} from 'react';
import Alert from '@material-ui/lab/Alert';
import {Snackbar} from "@material-ui/core";
import {useHistory} from 'react-router-dom';
import MarcaService from '../../../services/Marca/MarcaService';
import Listagem from '../../../components/Listagem';

const colunas = [{field: 'nome', headerName: 'Marca', width: 200}];

const ListagemMarcas = () => {

    const [marcas, setMarcas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [marcaSelecionada, setMarcaSelecionada] = useState();
    const [alert, setAlert] = useState(false);

    const history = useHistory();

    function excluir() {
        setLoading(true);
        MarcaService.excluir(marcaSelecionada)
            .then(() => {
                setMarcaSelecionada(null);
                carregarMarcas();
            })
            .catch(() => {
                setAlert(true);
            })
            .finally(() => setLoading(false));
    }

    // eslint-disable-next-line
    useEffect(() => carregarMarcas(), []);

    function carregarMarcas() {
        MarcaService.listar()
            .then((dados) => {
                setMarcas(dados.content);
            })
            .finally(() => setLoading(false));
    }

    function alterar() {
        if (marcaSelecionada) {
            history.push(`/alteracao-marca/${marcaSelecionada?.id}`);
        }
    }

    return (
        <>
          <Listagem
              alterar={alterar}
              excluir={excluir}
              incluir={() => history.push('/cadastro-marca')}
              colunas={colunas}
              linhas={marcas}
              rowSelected={marcaSelecionada}
              onRowSelected={setMarcaSelecionada}
              loading={loading}
          />
          <Snackbar
              data-testeid="snackbar"
              open={alert}
              autoHideDuration={4000}
              onClose={() => setAlert(!alert)}
          >
            <Alert severity="error" title="Erro!">
              Esta marca contém veículos relacionados!
            </Alert>
          </Snackbar>
        </>
    );
};

export default ListagemMarcas;
