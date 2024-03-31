import React from 'react'
import Navbar from "../components/Navbar.jsx";
import UserTable from '../components/UserTable.jsx';
import UserTableAdmin from '../components/UserTableAdmin.jsx';

function AdminPage() {
  return (
    <div>
        <Navbar />
        <UserTableAdmin/>
    </div>
  )
}

export default AdminPage