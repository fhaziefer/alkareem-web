import React from 'react'
import Navbar from "../components/Navbar.jsx";
import UserTable from '../components/UserTable.jsx';

function AdminPage() {
  return (
    <div>
        <Navbar />
        <h1 className='text-white'>THIS IS ADMIN PAGE</h1>
        <UserTable/>
    </div>
  )
}

export default AdminPage