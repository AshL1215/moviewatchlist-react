import React from 'react';
import { useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>About This App</h1>
      <p style={textStyle}>
        Welcome to the Movie Watchlist App! This application allows users to track movies they want to watch, rate the ones they’ve seen, and view what others recommend.
      </p>

      <div style={{ marginTop: '2rem' }}>
        <button onClick={() => navigate('/login')} style={buttonStyle}>Login</button>
        <button onClick={() => navigate('/register')} style={buttonStyle}>Register</button>
      </div>
    </div>
  );
}

const containerStyle = {
  backgroundColor: '#0C2340',
  color: '#C99700',
  padding: '2rem',
  minHeight: '100vh',
  textAlign: 'center',
};

const headerStyle = {
  fontSize: '2.5rem',
  marginBottom: '1rem',
};

const textStyle = {
  fontSize: '1.2rem',
  maxWidth: '600px',
  margin: '0 auto',
};

const buttonStyle = {
  margin: '0 1rem',
  padding: '0.5rem 1.5rem',
  fontSize: '1rem',
  fontWeight: 'bold',
  backgroundColor: '#C99700',
  color: '#0C2340',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default About;
