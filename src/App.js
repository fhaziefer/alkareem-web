import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import ProtectiveRoute from "./utils/ProtectiveRoute.jsx";

import HomePage from "./pages/Home.jsx";
import LoginPage from "./pages/Login.jsx";
import SignupPage from "./pages/Signup.jsx";
import ExplorePage from "./pages/Explore.jsx";
import ProfilePage from "./pages/Profile.jsx";

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
        <Route
          path="/explore"
          element={
            <ProtectiveRoute>
              <ExplorePage />
            </ProtectiveRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectiveRoute>
              <ProfilePage />
            </ProtectiveRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
