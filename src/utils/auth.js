import AuthService from "../services/Auth/AuthService";

const estaLogado = async () => {
  const token = localStorage.getItem("token");

  const resposta = await AuthService.validar(token);

  if(resposta) {
    return true;
  }

  localStorage.clear();
  return false;
}

export { estaLogado }