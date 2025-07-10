// Main routing component for the application
import React from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import Components from "./Main/Components";
import * as Env from "../../environments";
import Parse from "parse";

// Importing page-level components
import MainMovie from './Main/MainMovie';
import About from './Auth/About';
import AuthLogin from './Auth/authlogin';
import AuthRegister from './Auth/authregister';
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";


Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

function App() {
  return (
    <Router>
      <div>
        {/* Navigation */}
        <nav>
          <Link to="/">Home</Link>  
          <Link to="/about">About</Link>
        </nav>
        <Components />
      </div>
    </Router>
  );
}

export default App;
