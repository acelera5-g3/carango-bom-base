const estaLogado = () => {
  const token = localStorage.getItem("token");

  if(token) {
    return true;
  }

  localStorage.clear();
  return false;
}

export { estaLogado }