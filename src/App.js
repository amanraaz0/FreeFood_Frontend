import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AddFood from "./pages/AddFood";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyClaims from "./pages/MyClaims";
import MyProducts from "./pages/MyProducts";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // 🔄 Restore login on refresh
  useEffect(() => {
    let savedUser = null;

    try {
      const storedUser = localStorage.getItem("currentUser");

      if (storedUser && storedUser !== "undefined") {
        savedUser = JSON.parse(storedUser);
      }
    } catch (error) {
      console.error("Invalid JSON in localStorage:", error);
      localStorage.removeItem("currentUser");
    }

    const token = localStorage.getItem("token");

    if (savedUser && token) {
      setIsLoggedIn(true);
      setCurrentUser(savedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <Router>
      <Navbar
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        handleLogout={handleLogout}
      />

      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={<Home isLoggedIn={isLoggedIn} currentUser={currentUser} />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Dashboard (public view, claim protected inside) */}
        <Route
          path="/dashboard"
          element={
            <Dashboard isLoggedIn={isLoggedIn} currentUser={currentUser} />
          }
        />
        <Route
          path="/my-products"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <MyProducts />
            </ProtectedRoute>
          }
        />

        {/* Add Food (ONLY logged-in users) */}
        <Route
          path="/addfood"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AddFood isLoggedIn={isLoggedIn} currentUser={currentUser} />
            </ProtectedRoute>
          }
        />

        {/* Auth */}
        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              setCurrentUser={setCurrentUser}
            />
          }
        />

        <Route path="/signup" element={<Signup />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
        <Route
          path="/my-claims"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <MyClaims />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
