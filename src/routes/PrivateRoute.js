import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../hooks/AuthContext';

// eslint-disable-next-line react/prop-types
export default async function PrivateRoute() {
  const context = useContext(AuthContext);
  console.log(context);
  if(context.logado){
    return <h1>oi</h1>
  }
    localStorage.clear();
    return (<Redirect to="/login" />)
}

