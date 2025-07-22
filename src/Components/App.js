import React from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Components from "./Main/Components";
import * as Env from "../environments";
import Parse from "parse";

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

function App() {
  return (
    <Router>
      <div>
        {/* Navigation */}
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/recommendations">Recomendations</Link>
        </nav>
        <Components />
      </div>
    </Router>
  );
}

// 🔁 New Navbar Component with auth-based logic
function Navbar() {
  const navigate = useNavigate();
  const user = Parse.User.current();

  const handleLogout = async () => {
    try {
      await Parse.User.logOut();
      window.location.href = "/login";
    } catch (error) {
      alert("Logout failed: " + error.message);
    }
  };

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '1rem',
        backgroundColor: '#002654',
        padding: '1rem',
      }}
    >
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/about" style={linkStyle}>About</Link>

      {!user && (
        <>
          <Link to="/register" style={linkStyle}>Register</Link>
          <Link to="/login" style={linkStyle}>Login</Link>
        </>
      )}

      {user && (
        <button onClick={handleLogout} style={logoutStyle}>
          Logout
        </button>
      )}
    </nav>
  );
}

// 🟡 Styling
const linkStyle = {
  color: '#fcbf49',
  textDecoration: 'none',
  fontWeight: 'bold',
};

const logoutStyle = {
  backgroundColor: '#fcbf49',
  color: '#002654',
  border: 'none',
  padding: '0.5rem 1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  borderRadius: '5px',
};

export default App;
