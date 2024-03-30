import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectiveRoute = ({children}) => {
  const loginData = window.localStorage.getItem('LOGIN_DATA');
    const isLogin = JSON.parse(loginData);
    console.log(loginData);
    if (!isLogin) {
        return <Navigate to='/login'/>
    }
  return children;
}

export default ProtectiveRoute