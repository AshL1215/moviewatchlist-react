// This file assigns the different pages of the app to protected or unprotected
import React from "react";
import {
  Navigate,
  Routes,
  Route,
} from "react-router-dom";

import About from "../Auth/About.js";
import AuthRegister from "../Auth/authregister";
import AuthLogin from "../Auth/authlogin";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import MainMovie from "./MainMovie.js";
import Recommendations from "./Recommendations.js"; // Fixed import spelling

const Components = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/about" element={<About />} />
      <Route path="/register" element={<AuthRegister />} />
      <Route path="/login" element={<AuthLogin />} />

      {/* Protected Routes */}
      <Route path="/" element={<ProtectedRoute element={MainMovie} />} />
      <Route path="/recommendations" element={<ProtectedRoute element={Recommendations} />} />
      <Route path="*" element={<Navigate to="/about" replace />} />
    </Routes>
  );
};

export default Components;
