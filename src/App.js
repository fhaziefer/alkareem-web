import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React from "react";
import HomePage from "./pages/Home.jsx";
import LoginPage from "./pages/Login.jsx";
import SignupPage from "./pages/Signup.jsx";
import ProtectiveRoute from "./utils/ProtectiveRoute.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/"
          element={
            <ProtectiveRoute>
              <HomePage />
            </ProtectiveRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
