/* eslint-disable react/prop-types */
// import React, { useState, createContext, useEffect, useCallback } from 'react';
// import AuthService from '../services/Auth/AuthService';
// import { estaLogado } from '../utils/auth';

// export const AuthContext = createContext();

// export const AuthProvider = (props) => {
//   const logado = estaLogado()

//   const handleValidarToken = useCallback((token) => {
//     AuthService.validar(token)
//       .then(setLogado(true))
//       .catch(() => {
//         setLogado(false);
//         localStorage.clear();
//       });
//   }, []);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
    
//     token ? setLogado(true) : setLogado(false);

//   }, []);

//   return (
//     <AuthContext.Provider value={[logado, setLogado]}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// };
