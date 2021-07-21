import React from 'react'
import { Redirect } from 'react-router-dom'
import { estaLogado } from '../utils/auth'

// eslint-disable-next-line react/prop-types
export default function PrivateRoute({ component }) {
  if(estaLogado()){
    return component
  }
    return (<Redirect to="/login" />)
}

