// This file assigns the different pages of the app to protected or unprotected
// Import needed react features
import React from "react";
import {
  Navigate,
  Routes,
  Route,
} from "react-router-dom";

// import files and about us page
import About from "../Auth/About.js";
import AuthRegister from "../Auth/authregister";
import AuthLogin from "../Auth/authlogin";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import MainMovie from "./MainMovie.js";
import Recommendations from "./Reccomendations.js";

// Site Organization
// Public Route
// About Page with button for login and register About.js
// Login Page authlogin.js
// Register Page authregister.js

// Protected Route Page:
// MainMovie.js, Reccomendations.js


// Connecting all of the compknets to specific routes
const Components = () => {
  return (
      <Routes>
        // Public Routes
        <Route path="/about" element={<About />}/>
        <Route path="/register" element={<AuthRegister />} />
        <Route path="/login" element={<AuthLogin />} />

        // Protected Routes
        <Route path="/" element={<ProtectedRoute element={MainMovie} /> }/>
        <Route path="*" element={<Navigate to="/about" replace />} />
        <Route path="/recommendations" element={<ProtectedRoute element={Recommendations} />}/>
      </Routes>
  )
}

export default Components;