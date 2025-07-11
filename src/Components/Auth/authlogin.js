// authlogin.js - Handles user login logic using Parse

import React, { useState } from 'react';
import AuthForm from './authform';                  // Reusable form component
import { loginUser } from './authservices';        // Function to log in the user
import { useNavigate } from 'react-router-dom';    // For redirecting on success

const AuthLogin = () => {
  // Local state to track username and password inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook to redirect after login

  // Handles form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form refresh
    try {
      await loginUser(username, password); // Call backend login
      alert('Login successful!');
      navigate('/'); // Redirect to home (MainMovie)
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  };

  // Render reusable AuthForm component
  return (
    <AuthForm
      type="login"
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      onSubmit={handleLogin}
    />
  );
};

export default AuthLogin;
