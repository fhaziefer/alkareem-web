import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectiveRoute = ({children}) => {
    const isLogin = window.localStorage.getItem('LOGIN_STATUS')
    if (!isLogin) {
        return <Navigate to='/login'/>
    }
  return children;
}

export default ProtectiveRoute