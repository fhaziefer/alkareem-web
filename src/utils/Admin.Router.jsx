import React from 'react'
import { Navigate } from 'react-router-dom'

const AdminRoute = ({children}) => {
    const userData = JSON.parse(window.localStorage.getItem('LOGIN_DATA'))
    if (!userData) {
        return <Navigate to='/login'/>
    } else if (userData.role === "USER") {
        return <Navigate to='/'/>
    }
  return children;
}

export default AdminRoute