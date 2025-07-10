// This is the first page users will see when they enter website
// This is a simple About component for the Movie Watchlist application.
// It displays information about the application when the user visits the about page.
// import react features and other necessary files
import React from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { checkUser } from "./authservices";

function About() {
  // Redirect user if they are already logged in
 useEffect(() => {
    if (checkUser()) {
      alert("You are already logged in");
      navigate("/");
    }
  }, [navigate]);

  return (
  <div>
  <h1>About This App</h1>
  <p>
    Our movie watchlist app allows you to explore our catalogue of movies and add them to your watchlist!
  </p>

  // Login and register buttons
      <Link to="./authregister">
        <button>Register</button>
      </Link>
      <br />
      <br />
      <Link to="./authlogin">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default About
