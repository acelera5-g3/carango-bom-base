/* eslint-disable react/prop-types */
import React, { useState, createContext, useEffect } from 'react';
import AuthService from '../services/Auth/AuthService';

export const AppContext = createContext();


export const AuthContext = (props) => {
  const token = localStorage.getItem("token");

  const [logado, setLogado] = useState(false);

  useEffect(() => {
    console.log('entrei', logado);
    AuthService.validar(token).then((r) => setLogado(r));
  }, [token])

  return (
    <AppContext.Provider value={[logado, setLogado]}>
      {props.children}
    </AppContext.Provider>
  )
}