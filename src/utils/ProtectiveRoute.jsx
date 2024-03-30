import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectiveRoute = ({children}) => {
  const userData = JSON.parse(window.localStorage.getItem('LOGIN_DATA'))
    if (!userData) {
        return <Navigate to='/login'/>
    }
  return children;
}

export default ProtectiveRoute