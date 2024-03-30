import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import React from 'react';
import HomePage from './pages/Home.jsx';
import LoginPage from './pages/Login.jsx';
import SignupPage from './pages/Signup.jsx';

function App() {
  window.onbeforeunload = function () {
    localStorage.clear();
  };
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/' element={<HomePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;