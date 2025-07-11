// authregister.js - Handles user registration logic using Parse

import React, { useState } from 'react';
import AuthForm from './authform';                   // Reusable form component
import { registerUser } from './authservices';      // Function to register user
import { useNavigate } from 'react-router-dom';     // For redirecting on success

const AuthRegister = () => {
  // Local state to track input fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Redirect hook

  // Handles form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(username, password); // Call backend signup
      alert('Registration successful!');
      navigate('/'); // Redirect to home (MainMovie)
    } catch (err) {
      alert('Registration failed: ' + err.message);
    }
  };

  // Render reusable AuthForm component
  return (
    <AuthForm
      type="register"
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      onSubmit={handleRegister}
    />
  );
};

export default AuthRegister;
