import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../hooks/AuthContext';

// eslint-disable-next-line react/prop-types
export default function PrivateRoute({ component }) {
  const [logado] = useContext(AuthContext);

  if (logado) {
    return component;
  }
  
  return <Redirect to="/login" />;
}
