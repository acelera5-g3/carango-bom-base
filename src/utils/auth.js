const estaLogado = () => {
  const token = localStorage.getItem("token");

  if(token) {
    return true
  }
  
  return false
}

export { estaLogado }