import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom';
import Components from './Main/Components';
import About from './Auth/About';
import AuthLogin from './Auth/authlogin';
import AuthRegister from './Auth/authregister';
import Recommendations from './Main/Recommendations';
import RateMovies from './Main/RateMovies';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import Parse from 'parse';
import * as Env from '../environments';

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Components />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/register" element={<AuthRegister />} />
        <Route
          path="/recommendations"
          element={
            <ProtectedRoute>
              <Recommendations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rate"
          element={
            <ProtectedRoute>
              <RateMovies />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

function Navbar() {
  const user = Parse.User.current();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await Parse.User.logOut();
      navigate('/');
    } catch (error) {
      alert("Logout failed.");
    }
  };

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: '#0C2340',
        padding: '1rem',
      }}
    >
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/" style={navStyle}>Home</Link>
        <Link to="/about" style={navStyle}>About</Link>
        <Link to="/recommendations" style={navStyle}>Recommendations</Link>
        <Link to="/rate" style={navStyle}>Rate</Link>
        {user && (
          <button
            onClick={handleLogout}
            style={{
              ...navStyle,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

const navStyle = {
  color: '#C99700',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '1rem',
  background: 'none',
  border: 'none',
  padding: '0.5rem',
  cursor: 'pointer',
};

export default App;
