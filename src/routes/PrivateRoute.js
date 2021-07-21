import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { estaLogado } from '../utils/auth'

export default function PrivateRoute(props) {
  if(estaLogado()){
    return (<Route {...props}/>)
  }
    return (<Redirect to="/login" />)
}
