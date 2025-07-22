import React from "react";
import { Routes, Route } from "react-router-dom";

import About from "../Auth/About.js";
import AuthRegister from "../Auth/authregister";
import AuthLogin from "../Auth/authlogin";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import MainMovie from "./MainMovie.js";
import Recommendations from "./Recommendations.js";

const Components = () => {
  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/register" element={<AuthRegister />} />
      <Route path="/login" element={<AuthLogin />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainMovie />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recommendations"
        element={
          <ProtectedRoute>
            <Recommendations />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Components;
