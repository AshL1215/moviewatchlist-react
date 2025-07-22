import React from 'react';
import { Navigate } from 'react-router-dom';
import Parse from 'parse';

const ProtectedRoute = ({ children }) => {
  const user = Parse.User.current();

  if (!user) {
    return (
      <div style={unauthorizedStyle}>
        <h2>Unauthorized!</h2>
        <p>You must be logged in to view this page.</p>
        <p>
          Please go to the <a href="/about" style={linkStyle}>About</a> page to log in or register.
        </p>
      </div>
    );
  }

  // ✅ Always return children if logged in
  return <>{children}</>;
};

const unauthorizedStyle = {
  backgroundColor: '#0C2340',
  color: '#C99700',
  textAlign: 'center',
  padding: '3rem',
  minHeight: '100vh',
};

const linkStyle = {
  color: '#C99700',
  fontWeight: 'bold',
  textDecoration: 'underline',
};

export default ProtectedRoute;
