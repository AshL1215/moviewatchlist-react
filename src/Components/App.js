// Main routing component for the application
import React from 'react';
import Components from "./Main/Components";
import * as Env from "../environments";
import Parse from "parse";

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

// Importing page-level components
import MainMovie from './Main/MainMovie';
import About from './Auth/About';
import AuthLogin from './Auth/authlogin';
import AuthRegister from './Auth/authregister';
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <Router>
      <div>
        {/* Navigation */}
        <nav>
          <Link to="/">Home</Link>  
          <Link to="/about">About</Link>
        </nav>
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
