
import React from "react";

// Reusable form component used by both login and registration
const AuthForm = ({ type, username, password, setUsername, setPassword, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <h2>{type === "login" ? "Login" : "Register"}</h2>

      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <br />

      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <br />

      <button type="submit">{type === "login" ? "Login" : "Register"}</button>
    </form>
  );
};

export default AuthForm;
